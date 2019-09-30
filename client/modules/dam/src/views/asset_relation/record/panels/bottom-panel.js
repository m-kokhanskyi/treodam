Espo.define('dam:views/asset_relation/record/panels/bottom-panel', 'treo-core:views/record/panels/relationship',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/panels/asset-relations",
        blocks: [],

        data() {
            return {
                blocks: this.blocks
            }
        },

        setup() {
            this.getGroupsInfo();
            this.actionButtonList();
        },

        getGroupsInfo() {
            this.wait(true);
            let items = this.getMetadata().get("entityDefs.Asset.fields.type.options");
            let url = "AssetRelation/" + this.model.name + "/" + this.model.id + "/itemsInEntity?list=" + items.join(",");
            this.blocks = [];

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
                            this.blocks.push(model.get("name"));
                            this.createView(model.get('name'), "dam:views/asset_relation/record/panels/asset-type-block", {
                                model: model,
                                el: this.options.el + ' .group[data-name="' + model.get("name") + '"]'
                            });
                        }
                    });
                    this.wait(false);
                })
            });
        },

        actionButtonList() {

            this.actionList.unshift({
                label: 'Select',
                action: this.defs.selectAction || 'selectRelation',
                acl: 'edit',
                aclScope: this.model.name
            });

            this.buttonList.push({
                title: 'Create',
                action: this.defs.createAction || 'createRelation',
                link: this.link,
                acl: 'create',
                aclScope: this.scope,
                html: '<span class="fas fa-plus"></span>',
                data: {
                    link: this.link,
                }
            });
        },

        actionCreateRelation() {
            this.createView("createAssetRelation", "dam:views/asset_relation/record/modals/create-asset-relation", {}, (view) => {
                view.render();
            });
        },

        selectRelation() {

        }
    })
);