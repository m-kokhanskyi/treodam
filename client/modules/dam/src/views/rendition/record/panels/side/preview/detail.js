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

Espo.define('dam:views/rendition/record/panels/side/preview/detail', ["view", "dam:config"],
    (Dep, Config) => Dep.extend({
        template : "dam:rendition/record/panels/side/preview/detail",
        damConfig: null,
        assetType: null,
        
        events: {
            'click a[data-action="showImagePreview"]': function (e) {
                e.stopPropagation();
                e.preventDefault();
                let id = $(e.currentTarget).data('id');
                this.createView('preview', 'dam:views/modals/image-preview', {
                    id   : id,
                    model: this.model
                }, function (view) {
                    view.render();
                });
            }
        },
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            Dep.prototype.setup.call(this);
            
            this.listenTo(this.model, "change:fileId", () => {
                this.reRender();
            });
            
            if (this.model.get("assetId")) {
                this._setAssetType();
            }
            
            this.listenTo(this.model, "sync", () => {
                this._setAssetType(assetModel => {
                    this.reRender();
                });
            });
        },
        
        _setAssetType(callback) {
            this.getModelFactory().create("Asset", model => {
                model.id = this.model.get("assetId");
                model.fetch().then(() => {
                    this.assetType = this.damConfig.getType(model.get("type"));
                    
                    if (typeof callback === "function") {
                        callback(model);
                    }
                });
            });
        },
        
        data() {
            // debugger;
            return {
                show: this._showImage(),
                path: this.options.el
            };
        },
        
        _showImage() {
            return !!(
                this._isImage() && this._hasImage()
            );
        },
        
        _hasImage() {
            return this.model.has("fileId") && this.model.get("fileId");
        },
        
        _isImage() {
            if (this.model.get("type") && this.assetType) {
                return this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.preview`)
                    || this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.nature`) === "image"
                    || false;
                
            }
            return false;
        }
    })
);