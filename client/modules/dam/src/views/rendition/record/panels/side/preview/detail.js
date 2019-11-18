Espo.define('dam:views/rendition/record/panels/side/preview/detail', ["view", "dam:config"],
    (Dep, Config) => Dep.extend({
        template  : "dam:rendition/record/panels/side/preview/detail",
        damConfig : null,
        assetType: null,
        
        events: {
            'click a[data-action="showImagePreview"]': function (e) {
                e.stopPropagation();
                e.preventDefault();
                let id = $(e.currentTarget).data('id');
                this.createView('preview', 'dam:views/modals/image-preview', {
                    id   : id,
                    model: this.model
                }, function (view) {
                    view.render();
                });
            }
        },
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            Dep.prototype.setup.call(this);
            
            if (this.model.get("assetId")) {
                this.wait(true);
                this.getModelFactory().create("Asset", model => {
                    model.id = this.model.get("assetId");
                    model.fetch().then(() => {
                        this.assetType = this.damConfig.getType(model.get("type"));
                        this.wait(false);
                    });
                });
            }
        },
        
        data() {
            return {
                show: this._show()
            };
        },
        
        _show() {
            return this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.preview`)
                || this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.nature`) === "image"
                || false;
        }
    })
);