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

Espo.define('dam:views/asset/fields/file', 'dam:views/fields/file',
    Dep => Dep.extend({
        
        getDownloadUrl(id) {
            var url = this.getBasePath() + '?entryPoint=download&showInline=false&id=' + id;
            if (this.getUser().get('portalId')) {
                url += '&portalId=' + this.getUser().get('portalId');
            }
            return url;
        },
        
        setup() {
            Dep.prototype.setup.call(this);
            
            this.listenTo(this.model, "change:type", () => {
                this.deleteAttachment();
            });
        }
    })
);