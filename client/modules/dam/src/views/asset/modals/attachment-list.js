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

Espo.define('dam:views/asset/modals/attachment-list', 'view', function (Dep) {
    return Dep.extend({
        template: "dam:asset/modals/attachment-list",
        items   : [],
        
        data() {
            return {
                items: this.items
            };
        },
        
        setup() {
            this.items = [];
            for (let i = 0; i < this.collection.length; i++) {
                let attachment = this.collection.models[i];
                
                let name = `attachment-${attachment.get('id')}`;
                this.items.push(name);
                this.createView(name, "dam:views/asset/modals/attachment-item", {
                    el     : this.options.el + ` tr[data-name="${name}"]`,
                    model  : attachment,
                    type   : this.model.get('type'),
                    private: this.model.get('private')
                }, view => {
                    view.listenTo(view, "attachment:remove", () => {
                        this.reRender();
                    });
                });
            }
        }
    });
});