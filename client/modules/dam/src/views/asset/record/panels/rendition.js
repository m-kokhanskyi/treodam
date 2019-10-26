Espo.define('dam:views/asset/record/panels/rendition', 'treo-core:views/record/panels/relationship',
    Dep => {
        return Dep.extend({
            setup() {
                this.defs.create = this._create();
                Dep.prototype.setup.call(this);
            },
            
            _create() {
                let type       = this._getType();
                let renditions = this.getMetadata().get(`app.config.types.custom.${type}.renditions`);
                
                return !!renditions;
            },
            _getType() {
                if (this.model.get("type")) {
                    return this.model.get("type").replace(" ", "-").toLowerCase();
                } else {
                    this.model.listenToOnce(this.model, "sync", () => {
                        this.defs.create = this._create();
                        this.reRender();
                    });
                }
            }
            
        });
    }
);