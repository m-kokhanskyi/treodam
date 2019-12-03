Espo.define("dam:views/asset_relation/fields/related-entity-name", "dam:views/fields/varchar", Dep =>
    Dep.extend({
        listTemplate: "dam:asset_relation/fields/related-entity-name/list",
        
        data() {
            let data = {};
            
            if (this.model.get("scope") === "entity") {
                data = {
                    entity : "Asset",
                    id : this.model.get("assetId"),
                    name : this.model.get("relatedEntityName")
                }
            } else {
                data = {
                    entity : this.model.get("entityName"),
                    id : this.model.get("entityId"),
                    name : this.model.get("relatedEntityName")
                }
            }
            
            return data;
        }
    })
);