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

Espo.define('dam:views/asset/record/panels/side/download/original', 'view',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/side/download/original",
            active  : true,
            
            setup() {
            
            },
            
            hide() {
                this.active = false;
            },
            
            show() {
                this.active = true;
            },
    
            buildUrl() {
                let attachmentId = this.model.get("fileId") || this.model.get("imageId");
                return `?entryPoint=download&id=${attachmentId}&showInline=false`
            }
        });
    }
);