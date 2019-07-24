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

Espo.define('dam:views/fields/name-from-file', 'views/fields/varchar',
    Dep => Dep.extend({

        prevFileName: null,

        setup() {
            Dep.prototype.setup.call(this);
            this.prevFileName = this.modifyName(this.model.get("fileName") || this.model.get("imageName"));

            this.listenTo(this.model, 'change:imageId', () => {
                if (!this.model.get("name") || this.model.get("name") === this.prevFileName) {
                    this.setName();
                }
            });

            this.listenTo(this.model, 'change:fileId', () => {
                if (!this.model.get("name") || this.model.get("name") === this.prevFileName) {
                    this.setName();
                }
            });
        },
        setName() {
            let fileName = this.model.get('fileName') || this.model.get('imageName');
            this.model.set("nameOfFile", fileName);
            this.model.set("name", this.modifyName(fileName));
            this.prevFileName = this.modifyName(fileName);
        },
        modifyName(name) {
            if (name === null || name === undefined) {
                return '';
            }

            name = name.split('.');
            name.pop();
            return name.join('.').replace("_", " ");
        }
    })
);