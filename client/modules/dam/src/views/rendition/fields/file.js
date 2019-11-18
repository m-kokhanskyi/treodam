Espo.define('dam:views/rendition/fields/file', ["dam:views/fields/file", "dam:config"],
    (Dep, Config) => Dep.extend({
        assetType: null,
        damConfig: null,
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            Dep.prototype.setup.call(this);
            this.listenTo(this.model, "sync", () => {
                this._setReadOnly();
            });
            this._setReadOnly();
        },
        
        _setReadOnly () {
            if (this.model.get("assetId")) {
                this.wait(true);
                this.getModelFactory().create("Asset", model => {
                    model.id = this.model.get("assetId");
                    model.fetch().then(() => {
                        this.assetType = this.damConfig.getType(model.get("type"));
                        let isAuto = this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.auto`);
                
                        if (isAuto) {
                            this.readOnly = true;
                        }
                        this.wait(false);
                    });
                });
            }
        }
    })
);