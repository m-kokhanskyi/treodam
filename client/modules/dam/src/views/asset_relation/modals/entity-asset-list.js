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

Espo.define('dam:views/asset_relation/modals/entity-asset-list', 'views/modal', function (Dep) {
    return Dep.extend({
        template  : "dam:asset_relation/modals/entity-asset-list",
        items     : [],
        assetTypes: {},
        
        data() {
            return {
                items: this.items
            };
        },
        
        setup() {
            this.header     = this.getLanguage().translate("Create Entity Assets", 'labels', this.scope);
            this.assetTypes = this.options.assetTypes;
            
            this.addButton({
                name : "save",
                label: "Save",
                style: 'primary'
            });
            
            this.addButton({
                name : "cancel",
                label: "Cancel"
            });
            
            this._renderItems();
        },
        
        _renderItems() {
            this.items = [];
            
            this.collection.forEach((model) => {
               
                let viewName = `entityAsset-${model.id}`;
                this.items.push(viewName);
                this.createView(viewName, "dam:views/asset_relation/modals/entity-asset-item", {
                    model: model,
                    el   : this.options.el + ` tr[data-name="${viewName}"]`,
                    assetType : this.assetTypes[model.get("assetId")]
                });
            });
        },
        
        actionSave() {
            if (this.validate()) {
                this.notify('Not valid', 'error');
                return;
            }
            
            this.collection.forEach(model => {
                model.save().then(() => {
                    this.notify('Linked', 'success');
                    this.trigger("after:save");
                    this.dialog.close();
                });
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
        }
    });
});