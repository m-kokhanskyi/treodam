Espo.define('dam:views/asset/record/panels/side/download/renditions', 'view',
    Dep => {
        return Dep.extend({
            template  : "dam:asset/record/panels/side/download/renditions",
            active    : false,
            renditions: {},
            
            setup() {
                this._setRenditions();
            },
            
            hide() {
                this.active = false;
                this.$el.find(".additional-panel").hide();
            },
            
            show() {
                this.active = true;
                this.$el.find(".additional-panel").show();
            },
            
            _setRenditions() {
                this.getCollectionFactory().create("Renditions", collection => {
                    collection.url = `Asset/${this.model.id}/renditions?select=name,fileId,imageId`;
                    collection.fetch().then(() => {
                        this.collection = collection;
                        this.reRender();
                    });
                });
            },
            
            buildUrl() {
                let id           = this.$el.find("select").val();
                let model        = this.collection.get(id);
                let attachmentId = model.get("fileId") || model.get("imageId");
                
                return `?entryPoint=download&id=${attachmentId}`;
            }
        });
    }
);