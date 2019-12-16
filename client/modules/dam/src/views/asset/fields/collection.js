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

Espo.define('dam:views/asset/fields/collection', 'views/fields/link',
    Dep => Dep.extend({
        setup() {
            Dep.prototype.setup.call(this);
            
            if (this.model.isNew()) {
                this._setDefaultCollection();
            }
        },
        
        _setDefaultCollection() {
            this.wait(true);
            this.getModelFactory().create("Collection", collectionEntity => {
                let url   = "Collection?select=name";
                let where = [];
                
                where.push({
                    type : 'bool',
                    value: ['default']
                });
                collectionEntity.url = (
                    url + '&' + $.param({'where': where})
                );
                
                collectionEntity.fetch().then(() => {
                    if (collectionEntity.get("total") > 0) {
                        let model = collectionEntity.get("list")[0];
                        this.model.set("collectionName", model.name);
                        this.model.set("collectionId", model.id);
                    }
                    this.wait(false);
                });
            });
        }
    })
);