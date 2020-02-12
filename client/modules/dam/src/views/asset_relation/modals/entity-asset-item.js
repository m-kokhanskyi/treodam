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

Espo.define('dam:views/asset_relation/modals/entity-asset-item', ['view', "dam:config"], (Dep, Config) => {
    return Dep.extend({
        template : "dam:asset_relation/modals/entity-asset-item",
        type     : null,
        damConfig: null,
        
        data() {
            let data = {};
            
            data.preview = `?entryPoint=preview&size=small&id=${this.model.get("assetId")}`;
            
            return data;
        },
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            
            this.type = this.damConfig.getType(this.options.assetType);
            
            this.createView("entityAssetEdit", "dam:views/asset_relation/modals/entity-asset-form", {
                model: this.model,
                el   : this.options.el + " .edit-form"
            });
        },
        
        validate() {
            let notValid = false;
            for (let key in this.nestedViews) {
                const view = this.nestedViews[key];
                if (view && typeof view.validate === 'function') {
                    notValid = view.validate() || notValid;
                }
            }
            return notValid;
        },
        
        _showPreview() {
            let config = this.damConfig.getByType(this.type);
            return config.nature === "image" || config.preview;
        }
    });
});