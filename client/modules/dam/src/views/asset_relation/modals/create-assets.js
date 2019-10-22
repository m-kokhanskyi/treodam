Espo.define('dam:views/asset_relation/modals/create-assets', 'dam:views/modals/multi-create',
    Dep => Dep.extend({
        entityAssetModels : {},
        
        _renderAttachmentList() {
            this.createView("attachmentList", "dam:views/asset_relation/modals/attachment-list", {
                el        : this.options.el + " .attachment-list",
                collection: this.collection,
                model     : this.model
            }, view => {
                view.render();
            });
        },
        
        actionSave() {
            let Promises = [];
            this.collection.forEach(model => {
                let entityAssetModel = this._getEntityAssetModel(model.get("assetModel"));
                let assetModel       = model.get("assetModel");
                
                assetModel.setRelate(this.options.relate);
                
                Promises.push(new Promise((resolve, rejected) => {
                    assetModel.save().then(() => {
                        let entityId = this.getParentView().model.id;
                        entityAssetModel.url = `AssetRelation/update/by?entityName=${this.scope}&entityId=${entityId}&assetId=${assetModel.id}`;
                        entityAssetModel.save().then(() => {
                            resolve();
                        }).fail((data) => {
                            rejected();
                        });
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
        _getEntityAssetModel(model) {
            if (!this.entityAssetModels[model.id]) {
                this.entityAssetModels[model.id] = model.get("EntityAsset");
                model.unset("EntityAsset");
            }
            return this.entityAssetModels[model.id];
        }
    })
);