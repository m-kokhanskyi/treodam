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

Espo.define("dam:views/asset_relation/fields/related-entity-name", "dam:views/fields/varchar", Dep =>
    Dep.extend({
        listTemplate: "dam:asset_relation/fields/related-entity-name/list",
        
        data() {
            let data       = {};
            let mainEntity = this.getParentView().getParentView().getParentView().model.get("entityName");
            
            if (mainEntity === "Asset") {
                data = {
                    entity: this.model.get("entityName"),
                    id    : this.model.get("entityId"),
                    name  : this.model.get("relatedEntityName")
                };
            } else {
                data = {
                    entity: "Asset",
                    id    : this.model.get("assetId"),
                    name  : this.model.get("relatedEntityName")
                };
            }
            
            return data;
        }
    })
);