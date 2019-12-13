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

Espo.define('dam:views/modals/image-preview', 'views/modals/image-preview', function (Dep) {
    return Dep.extend({
        template: "dam:modals/image-preview",
        
        data () {
            return _.extend({
                path : this.options.el
            }, Dep.prototype.data.call(this));
        },
        
        getImageUrl() {
            return `${this.getBasePath()}?entryPoint=preview&type=attachment&size=original&id=${this.options.id}`;
        }
    });
});