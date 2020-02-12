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

Espo.define('dam:views/asset/record/panels/related-assets', 'views/record/panels/relationship',
    Dep => Dep.extend({
        
        boolFilterData: {
            notEntity  : function () {
                return this.model.id;
            },
            notSelected: function () {
                let listView = this.getView("list");
                let ids      = [];
                
                listView.collection.forEach((item) => {
                    ids.push(item.get("id"));
                });
                
                return ids;
            }
        },
        
        setup() {
            this.defs.createAction = "createMulti";
            Dep.prototype.setup.call(this);
            let select = this.actionList.find(item => item.action === (
                this.defs.selectAction || 'selectRelated'
            ));
            
            if (select) {
                select.data = {
                    link                  : this.link,
                    scope                 : this.scope,
                    boolFilterListCallback: 'getSelectBoolFilterList',
                    boolFilterDataCallback: 'getSelectBoolFilterData',
                    primaryFilterName     : this.defs.selectPrimaryFilterName || null
                };
            }
        },
        
        getSelectBoolFilterData(boolFilterList) {
            let data = {};
            if (Array.isArray(boolFilterList)) {
                boolFilterList.forEach(item => {
                    if (this.boolFilterData && typeof this.boolFilterData[item] === 'function') {
                        data[item] = this.boolFilterData[item].call(this);
                    }
                });
            }
            return data;
        },
        
        getSelectBoolFilterList() {
            return this.defs.selectBoolFilterList || null;
        },
        
        actionCreateMulti: function (data) {
            data = data || {};
            
            var link        = data.link;
            var scope       = this.model.defs['links'][link].entity;
            var foreignLink = this.model.defs['links'][link].foreign;
            
            var attributes = {};
            
            this.notify('Loading...');
            
            var viewName = this.getMetadata().get('clientDefs.' + scope + '.modalViews.edit') || "dam:views/asset/modals/multi-create";
            this.createView('quickCreate', viewName, {
                scope     : scope,
                relate    : {
                    model: this.model,
                    link : foreignLink
                },
                attributes: attributes
            }, function (view) {
                view.render();
                view.notify(false);
                this.listenToOnce(view, 'after:save', function () {
                    this.updateRelationshipPanel();
                }, this);
            }.bind(this));
        },
        
        updateRelationshipPanel: function () {
            this.notify('Success');
            this.collection.fetch();
        }
    })
);
