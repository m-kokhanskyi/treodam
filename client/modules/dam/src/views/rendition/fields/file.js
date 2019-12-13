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

Espo.define('dam:views/rendition/fields/file', ["dam:views/fields/file", "dam:config"],
    (Dep, Config) => Dep.extend({
        assetType: null,
        damConfig: null,
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            Dep.prototype.setup.call(this);
            this.listenTo(this.model, "sync", () => {
                this._setReadOnly();
            });
            this._setReadOnly();
        },
        
        _setReadOnly () {
            if (this.model.get("assetId")) {
                this.wait(true);
                this.getModelFactory().create("Asset", model => {
                    model.id = this.model.get("assetId");
                    model.fetch().then(() => {
                        this.assetType = this.damConfig.getType(model.get("type"));
                        let isAuto = this.damConfig.getByType(`${this.assetType}.renditions.${this.model.get("type")}.auto`);
                
                        if (isAuto) {
                            this.readOnly = true;
                        }
                        this.wait(false);
                    });
                });
            }
        }
    })
);