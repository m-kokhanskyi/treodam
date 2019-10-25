Espo.define('dam:views/rendition/fields/type', 'views/fields/enum',
    Dep => Dep.extend({
        setupOptions() {
            this.wait(true);
            this.getModelFactory().create("Asset", model => {
                model.id = this.model.get("assetId");
                model.fetch().then(() => {
                    
                    let renditionConfig = this.getMetadata().get("app.config.renditions");
                    let type            = model.get("type").replace(" ", "-").toLowerCase();
                    let enableTypes     = this.getMetadata().get(`app.config.types.custom.${type}.renditions`);
                    
                    let params = [];
                    
                    for (let i in this.params.options) {
                        let item = this.params.options[i];
                    
                        if (typeof enableTypes[item] !== "undefined" && (
                            (
                                typeof enableTypes[item].auto !== "undefined" && enableTypes[item].auto !== true
                            ) || (
                                typeof renditionConfig[item] !== "undefined" && typeof renditionConfig[item].auto !== "undefined" && renditionConfig[item].auto !== true
                            )
                        )) {
                            params.push(item);
                        }
                    }
                    this.params.options = params;
                    
                    this.wait(false);
                });
            });
        }
    })
);