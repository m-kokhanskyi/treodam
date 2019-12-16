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

Espo.define('dam:views/asset/record/panels/side/preview/main', ['view', "dam:config"],
    (Dep, Config) => {
        return Dep.extend({
            template : "dam:asset/record/panels/side/preview/main",
            damConfig: null,
            
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
            },
            data() {
                return {
                    showImage: this._showImage(),
                    path     : this.options.el
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
                if (this.model.get("type")) {
                    let type = this.damConfig.getType(this.model.get("type"));
                    return this.damConfig.getByType(`${type}.preview`)
                        || this.damConfig.getByType(`${type}.nature`) === "image";
                    
                }
                return false;
            }
        });
    }
);