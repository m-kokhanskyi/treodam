Espo.define('dam:views/asset/modals/multi-create', 'views/modal', function (Dep) {
    return Dep.extend({
        saved   : false,
        template: "dam:asset/modals/multi-create",
        
        events: _.extend({
            'change .field[data-name="type"] > select': function (e) {
                this.model.set("type", $(e.currentTarget).val());
            }
        }, Dep.prototype.events),
        
        setup() {
            this.header = this.getLanguage().translate("Create Assets", 'labels', this.scope);
            
            this.getCollectionFactory().create("Attachments", collection => {
                this.collection = collection;
                this.collection.listenTo(this.collection, "upload:done", () => {
                    this._renderAttachmentList();
                    this._afterUploadDone();
                });
            });
            
            this._renderType();
            this._renderUpload();
            
            this.listenTo(this, "close", () => {
                if (this.saved) {
                    return true;
                }
                let count = this.collection.length;
                while (count > 0) {
                    this.collection.models[0].destroy();
                    count--;
                }
            });
            
            this.once("after:save", () => {
                this.trigger("after:save");
            });
        },
        
        _renderAttachmentList() {
            this.createView("attachmentList", "dam:views/asset/modals/attachment-list", {
                el        : this.options.el + " .attachment-list",
                collection: this.collection,
                model     : this.model
            }, view => {
                view.render();
            });
        },
        
        _renderUpload() {
            this.createView("upload", "dam:views/asset/multi-upload", {
                model     : this.model,
                collection: this.collection,
                el        : this.options.el + ' div[data-name="upload"]'
            });
        },
        
        _renderType() {
            this.getModelFactory().create("CreateAssets", model => {
                let data = this.getMetadata().get("entityDefs.Asset.fields.type.options");
                model.set("type", data[0]);
                this.model = model;
                this.createView("type", "views/fields/enum", {
                    model: this.model,
                    el   : this.options.el + ' .field[data-name="type"]',
                    defs : {
                        name  : 'type',
                        params: {
                            options: this.getMetadata().get("entityDefs.Asset.fields.type.options")
                        }
                    },
                    mode : 'edit'
                });
            });
        },
        
        _afterUploadDone() {
            this.addButton({
                name : "save",
                label: "Save",
                style: 'primary'
            });
            
            this.addButton({
                name : "cancel",
                label: "Cancel"
            });
            
            this.getView("type").hide();
        },
        
        actionSave() {
            let Promises = [];
            this.collection.forEach(model => {
                model.get("assetModel").setRelate(this.options.relate);
                
                Promises.push(new Promise((resolve, rejected) => {
                    model.get("assetModel").save().then(() => {
                        resolve();
                    }).fail(() => {
                        rejected();
                    });
                }));
            });
            Promise.all(Promises).then(r => {
                this._afterSave();
                this.saved = true;
                this.dialog.close();
            }).catch(r => {
            
            });
        },
        
        _afterSave() {
            this.trigger("after:save");
        }
        
    });
});