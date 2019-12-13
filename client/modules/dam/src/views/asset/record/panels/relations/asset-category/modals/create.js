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

Espo.define('dam:views/asset/record/panels/relations/asset-category/modals/create', 'views/modals/edit',
    Dep => Dep.extend({
        actionSave: function () {
            let editModel  = this.getView("edit").model;
            let assetModel = this.options.assetModel;
            
            this._setCollection(editModel, assetModel);
            Dep.prototype.actionSave.call(this);
        },
        
        _setCollection(editModel, assetModel) {
            let collectionId   = assetModel.get("collectionId");
            let collectionName = {};
            
            collectionName[collectionId] = assetModel.get("collectionName");
            editModel.set("collectionsIds", [collectionId]);
            editModel.set("collectionsNames", collectionName);
        }
    })
);