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

Espo.define('dam:views/asset/record/panels/entity-block', 'view',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/entity-block",
            setup() {
                Dep.prototype.setup.call(this);
                
                this.createHeaderBlock();
                this.showInfo();
            },
            
            createHeaderBlock() {
                this.createView("headerBlock", "dam:views/asset/record/panels/header", {
                    model: this.model,
                    el   : this.options.el + " .group-name",
                    show : this.options.show || false
                });
            },
            
            showInfo() {
                if (this.collection) {
                    this.getView("list").reRender();
                } else {
                    this.getCollectionFactory().create("AssetRelation", (collection) => {
                        collection.url = `AssetRelation/byEntity/${this.model.get('entityName')}/${this.model.get('entityId')}?type=${this.model.get('name')}`;
                        
                        this.collection = collection;
                        this.createView('list', "dam:views/asset/record/panels/asset-relation-record-list", {
                            collection     : this.collection,
                            model          : this.model,
                            buttonsDisabled: true,
                            checkboxes     : false,
                            el             : this.options.el + ' .list-container',
                            layoutName     : "listSmall",
                            listLayout     : null,
                            skipBuildRows  : true
                        }, function (view) {
                            view.listenTo(collection, "sync", () => {
                                $(view.el).find('.list').slideDown("fast");
                            });
                            collection.fetch();
                        });
                    });
                }
            },
            
            hideInfo() {
                if (this.hasView("list")) {
                    let view = this.getView("list");
                    $(view.el).find(".list").slideUp("fast");
                }
            }
            
        });
    }
);