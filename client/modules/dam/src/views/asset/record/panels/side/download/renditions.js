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

Espo.define('dam:views/asset/record/panels/side/download/renditions', 'view',
    Dep => {
        return Dep.extend({
            template  : "dam:asset/record/panels/side/download/renditions",
            active    : false,
            renditions: {},
            
            setup() {
                Backbone.on("renditionSync", () => {
                    this._setRenditions();
                });
            },
            
            hide() {
                this.active = false;
                this.$el.find(".additional-panel").hide();
            },
            
            show() {
                this.active = true;
                this.$el.find(".additional-panel").show();
            },
            
            _setRenditions() {
                this.getCollectionFactory().create("Renditions", collection => {
                    collection.url = `Asset/${this.model.id}/renditions?select=name,fileId,imageId`;
                    collection.fetch().then(() => {
                        this.collection = collection;
                        this.reRender();
                    });
                });
            },
            
            buildUrl() {
                let id           = this.$el.find("select").val();
                let model        = this.collection.get(id);
                let attachmentId = model.get("fileId") || model.get("imageId");
                
                return `?entryPoint=download&id=${attachmentId}&showInline=false`;
            }
        });
    }
);