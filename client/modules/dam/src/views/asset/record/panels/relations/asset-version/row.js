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

Espo.define('dam:views/asset/record/panels/relations/asset-version/row',
    ['views/record/row-actions/relationship', 'dam:config'],
    (Dep, Config) => {
        return Dep.extend({
            damConfig : null,
            
            events: _.extend(Dep.prototype.events, {
                'click .action': function (e) {
                    var $el    = $(e.currentTarget);
                    var action = $el.data('action');
                    var method = 'action' + Espo.Utils.upperCaseFirst(action);
                    if (typeof this[method] === 'function') {
                        var data = $el.data();
                        this[method](data, e);
                    }
                }
            }),
            
            setup () {
                this.damConfig = Config.prototype.init.call(this);
                Dep.prototype.setup.call(this);
            },
            
            getActionList: function () {
                let list = [];
                
                list.push({
                    action: 'removeRelated',
                    label : 'Remove',
                    data  : {
                        id: this.model.id
                    }
                });
                
                list.push({
                    action: "downloadVersion",
                    label : "Download",
                    data  : {
                        id: this.model.id
                    }
                });
                
                if (this._hasPreview()) {
                    list.push({
                        action: "showPreview",
                        label : "Preview"
                    });
                }
                
                return list;
            },
            
            actionShowPreview() {
                this.createView('preview', 'dam:views/asset_version/modals/image-preview', {
                    id   : this.model.get('id'),
                    model: this.model
                }, function (view) {
                    view.render();
                });
            },
            
            actionDownloadVersion(data, e) {
                let $el = $(e.currentTarget);
                $el.prop("href", `?entryPoint=versions&event=download&type=asset&id=${data.id}`);
            },
            
            _hasPreview() {
                let assetView = this.getParentView()
                    .getParentView()
                    .getParentView();
                
                let type   = this.damConfig.getType(assetView.model.get("type"));
                let nature = this.damConfig.getByType(`${type}.nature`);
                
                return nature === "image";
            }
        });
    }
);