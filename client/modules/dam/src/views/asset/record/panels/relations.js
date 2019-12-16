/*
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

Espo.define('dam:views/asset/record/panels/relations', 'treo-core:views/record/panels/relationship',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/relations",
            blocks  : [],
            
            data() {
                return {
                    blocks: this.blocks
                };
            },
            
            setup() {
                this.getGroupsInfo();
            },
            
            getGroupsInfo() {
                this.wait(true);
                let url       = `AssetRelation/EntityList/${this.model.id}`;
                this.blocks   = [];
                let showFirst = true;
                
                this.getCollectionFactory().create("AssetRelation", (collection) => {
                    collection.url = url;
                    collection.fetch().then(() => {
                        this.collection = collection;
                        this.collection.forEach((model) => {
                            model.set({
                                entityName: "Asset",
                                entityId  : this.model.id
                            });
                            
                            let params = {
                                model: model,
                                el   : this.options.el + ' .group[data-name="' + model.get("name") + '"]'
                            };
                            
                            this.blocks.push(model.get("name"));
                            this.createView(model.get('name'), "dam:views/asset/record/panels/entity-block", params);
                        });
                        this.wait(false);
                    });
                });
            }
        });
    }
);