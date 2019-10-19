Espo.define('dam:views/asset_relation/record/panels/bottom-panel', 'treo-core:views/record/panels/relationship',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/panels/asset-relations",
        blocks  : [],
        link    : null,
        sort    : false,
        
        data() {
            return {
                blocks: this.blocks
            };
        },
        
        setup() {
            this.link = this._getAssetLink();
            
            this.getGroupsInfo();
            if (this.link) {
                this.actionButtonList();
            }
        },
        
        getGroupsInfo() {
            this.wait(true);
            let items     = this.getMetadata().get("entityDefs.Asset.fields.type.options");
            let url       = "AssetRelation/" + this.model.name + "/" + this.model.id + "/itemsInEntity?list=" + items.join(",");
            this.blocks   = [];
            let showFirst = true;
            
            this.getCollectionFactory().create("AssetRelation", (collection) => {
                collection.url = url;
                collection.fetch().then(() => {
                    this.collection = collection;
                    this.collection.forEach((model) => {
                        if (model.get("hasItem")) {
                            model.set({
                                entityName: this.defs.entityName,
                                entityId  : this.model.id
                            });
                            
                            let params = {
                                model: model,
                                el   : this.options.el + ' .group[data-name="' + model.get("name") + '"]',
                                sort : this.sort
                            };
                            
                            if (showFirst) {
                                params.show = true;
                                showFirst   = false;
                            }
                            
                            this.blocks.push(model.get("name"));
                            this.createView(model.get('name'), "dam:views/asset_relation/record/panels/asset-type-block", params);
                        }
                    });
                    this.wait(false);
                });
            });
        },
        
        actionButtonList() {
            
            this.actionList.unshift({
                label   : 'Select',
                action  : this.defs.selectAction || 'selectRelation',
                acl     : 'edit',
                aclScope: this.model.name
            });
            
            this.buttonList.push({
                title   : 'Create',
                action  : this.defs.createAction || 'createRelation',
                link    : this.link,
                acl     : 'create',
                aclScope: this.scope,
                html    : '<span class="fas fa-plus"></span>',
                data    : {
                    link: this.link
                }
            });
        },
        
        actionCreateRelation() {
            this.createView("createAssetRelation", "dam:views/asset_relation/modals/create-assets", {
                relate: {
                    model: this.model,
                    link : this.model.defs['links'][this.link].foreign
                },
                scope : this.model.urlRoot
            }, (view) => {
                view.render();
            });
        },
        
        selectRelation() {
        
        },
        
        _getAssetLink() {
            let links = this.model.defs.links;
            for (let key in links) {
                if (links[key].type === "hasMany" && links[key].entity === "Asset") {
                    this.sort = true;
                    return key;
                }
            }
            
            return false;
        }
    })
);