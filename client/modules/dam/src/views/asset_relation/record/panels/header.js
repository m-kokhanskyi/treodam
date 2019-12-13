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

Espo.define('dam:views/asset_relation/record/panels/header', 'view',
    Dep => Dep.extend({

        template: "dam:asset_relation/record/panels/header",
        show: false,

        setup() {
            Dep.prototype.setup.call(this);
            this.show = this.options.show || false;
        },

        data() {
            return {
                name: this.model.get("name"),
                hasItems: this.model.get("hasItem"),
                show: this.show
            }
        },

        showPanel() {
            this.show = !this.show;
            this.reRender();
            if (this.show) {
                this.getParentView().showInfo();
            } else {
                this.getParentView().hideInfo();
            }

        },
        events: {
            'click .show-view': function (e) {
                e.stopPropagation();
                e.preventDefault();

                this.showPanel();
            }
        },
    })
);