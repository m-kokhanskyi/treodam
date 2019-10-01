Espo.define('dam:views/asset/record/panels/relations', 'treo-core:views/record/panels/relationship',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/relations",
            blocks: [],

            getData() {
                return {
                    blocks: this.blocks
                }
            },

            setup() {
                this.getGroupsInfo();
            },

            getGroupsInfo() {
                this.wait(true);
                let url = "AssetRelation/EntityList";
                this.blocks = [];
                let showFirst = true;

                this.getCollectionFactory().create("AssetRelation", (collection) => {
                    collection.url = url;
                    collection.fetch().then(() => {
                        this.collection = collection;
                        this.collection.forEach((model) => {
                            if (model.get("hasItem")) {
                                model.set({
                                    entityName: this.defs.entityName,
                                    entityId: this.model.id
                                });

                                let params = {
                                    model: model,
                                    el: this.options.el + ' .group[data-name="' + model.get("name") + '"]'
                                };

                                if (showFirst) {
                                    params.show = true;
                                    showFirst = false;
                                }

                                this.blocks.push(model.get("name"));
                                this.createView(model.get('name'), "dam:views/asset_relation/record/panels/asset-type-block", params);
                            }
                        });
                        this.wait(false);
                    })
                });
            },
        });
    }
);