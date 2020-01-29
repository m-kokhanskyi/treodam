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

Espo.define('dam:views/asset/record/panels/rendition',
    ['treo-core:views/record/panels/relationship', "dam:config"],
    (Dep, Config) => {
        return Dep.extend({
            damConfig : null,
            
            setup() {
                this.damConfig = Config.prototype.init.call(this);
                this.defs.create = this._create();
                Dep.prototype.setup.call(this);
                
                this.listenTo(this.collection, "sync", () => {
                    Backbone.trigger("renditionSync");
                });
            },
            
            _create() {
                let type       = this._getType();
                let renditions = this.damConfig.getByType(`${type}.renditions`);
                
                return !!renditions;
            },
            _getType() {
                if (this.model.get("type")) {
                    return this.damConfig.getType(this.model.get('type'));
                } else {
                    this.model.listenToOnce(this.model, "sync", () => {
                        this.defs.create = this._create();
                        this.reRender();
                    });
                }
            }
        });
    }
);