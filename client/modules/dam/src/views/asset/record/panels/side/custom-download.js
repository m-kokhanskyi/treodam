Espo.define('dam:views/asset/record/panels/side/custom-download', 'view',
    Dep => {
        return Dep.extend({
            template     : "dam:asset/record/panels/side/custom-download",
            downloadModel: null,
            attachmentId : null,
            
            events: {
                'click a[data-name="custom-download"]': function (e) {
                    let $el = $(e.currentTarget);
                    let url = "?entryPoint=custom-download&id=" + this.attachmentId +
                        "&width=" + this.downloadModel.get("width") +
                        "&height=" + this.downloadModel.get("height") +
                        "&quality=" + this.downloadModel.get("quality");
                    
                    $el.prop("href", url);
                },
                'change input'                        : function (e) {
                    let $el  = $(e.currentTarget);
                    let name = $el.prop("name");
                    this.downloadModel.set(name, $el.val());
                }
            },
            
            data() {
                return {
                    downloadModel: this.downloadModel
                };
            },
            
            setup() {
                Dep.prototype.setup.call(this);
                
                this._createModel();
                this.attachmentId = this.model.get("fileId") || this.model.get("imageId");
                if (!this.model.get("width")) {
                    this.listenTo(this.model, "sync", () => {
                        this._createModel();
                        this.attachmentId = this.model.get("fileId") || this.model.get("imageId");
                        this.reRender();
                    });
                }
            },
            _createModel() {
                this.getModelFactory().create("downloadModel", model => {
                    model.set("width", this.model.get("width"));
                    model.set("height", this.model.get("height"));
                    model.set("quality", 100);
                    
                    this.downloadModel = model;
                    model.listenTo(model, "change:quality", () => {
                        if (parseInt(model.get('quality')) > 100) {
                            model.set("quality", 100);
                            this.reRender();
                        }
                        if (parseInt(model.get('quality')) < 0) {
                            model.set("quality", 0);
                            this.reRender();
                        }
                    });
                    
                    model.listenTo(model, "change:width", () => {
                        if (parseInt(model.get('width')) < 1) {
                            model.set("width", 1);
                            this.reRender();
                        }
                    });
                    
                    model.listenTo(model, "change:height", () => {
                        if (parseInt(model.get('height')) < 1) {
                            model.set("height", 1);
                            this.reRender();
                        }
                    });
                });
            }
        });
    }
);