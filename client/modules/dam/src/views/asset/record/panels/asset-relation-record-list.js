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

Espo.define('dam:views/asset/record/panels/asset-relation-record-list', 'views/record/list',
    Dep => {
        return Dep.extend({
            filterListLayout: function (listLayout) {
                let list    = Dep.prototype.filterListLayout.call(this, listLayout);
                let newList = [];
                
                for (let i = 0; i < list.length; i++) {
                    if (list[i].name === "preview") {
                        continue;
                    }
                    newList.push(list[i]);
                }
                
                return newList;
            }
        });
    }
);