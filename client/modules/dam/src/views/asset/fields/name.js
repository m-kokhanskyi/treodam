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

Espo.define('dam:views/asset/fields/name', 'views/fields/varchar',
    Dep => Dep.extend({
        fileName: null,
        
        setup() {
            Dep.prototype.setup.call(this);
            this.fileName = this._getFileName();
            
            this.registerListeners();
        },
        
        registerListeners() {
            this.listenTo(this.model, "change:fileId", () => {
                this.updateName();
            });
            
            this.listenTo(this.model, "change:imageId", () => {
                this.updateName();
            });
        },
        
        updateName() {
            if (this._isGeneratedName()) {
                this.model.set("name", this._normalizeName(this._getFileName()));
                this.fileName = this._getFileName();
            }
        },
        
        _getFileName() {
            let name = this.model.get("fileName") || this.model.get("imageName");
        
            if (!name) {
                return '';
            }
            
            name = name.split('.');
            name.pop();
            return name.join('.');
        },
        
        _normalizeName(name) {
            return name.replace(/[_-]+/gm, " ");
        },
        
        _isGeneratedName() {
            if (!this.model.get("name")) {
                return true;
            }
            
            return this.model.get("name") === this._normalizeName(this.fileName);
        }
    })
);