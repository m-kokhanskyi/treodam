Espo.define('dam:views/asset_relation/modals/entity-asset-item', 'view', function (Dep) {
    return Dep.extend({
        template: "dam:asset_relation/modals/entity-asset-item",
        field   : null,
        
        data() {
            let data = {
                'assetSize': `${this.model.get("assetSize")} kb`
            };
            
            if (this.field === "image") {
                data.preview = `?entryPoint=preview&size=small&id=${this.model.get("assetId")}`;
            }
            
            return data;
        },
        
        setup() {
            let typeCode = this.model.get("assetType").replace(" ", "-").toLowerCase();
            this.field   = this.getMetadata().get(`app.config.types.custom.${typeCode}.nature`);
            
            this.createView("entityAssetEdit", "dam:views/asset_relation/modals/entity-asset-form", {
                model: this.model,
                el   : this.options.el + " .edit-form"
            });
        },

        validate() {
            let notValid = false;
            for (let key in this.nestedViews) {
                const view = this.nestedViews[key];
                if (view && typeof view.validate === 'function') {
                    notValid = view.validate() || notValid;
                }
            }
            return notValid
        }
    });
});