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

Espo.define('dam:views/asset/fields/preview', 'view',
    Dep => Dep.extend({
        template: "dam:asset/fields/preview/list",
    
        events: {
            'click a[data-action="showImagePreview"]': function (e) {
                e.stopPropagation();
                e.preventDefault();
                let id = $(e.currentTarget).data('id');
                this.createView('preview', 'dam:views/asset/modals/image-preview', {
                    id   : id,
                    model: this.model,
                    type : "asset"
                }, function (view) {
                    view.render();
                });
            }
        },
        
        data() {
            return {
                "timestamp": this.getTimestamp()
            };
        },
        setup() {
            Dep.prototype.setup.call(this);
        },
        getTimestamp() {
            return (Math.random() * 10000000000).toFixed();
        }
    })
);