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

Espo.define('dam:views/rendition/detail', 'dam:views/detail',
    Dep => Dep.extend({
        assetModel: null,
        
        setupHeader: function () {
            this.waitForView("header");
            if (this.model.has("assetId")) {
                this.createBreadcrumbs();
            }

            this.listenTo(this.model, 'sync', function (model) {
                this.waitForView("header");
                if (model.hasChanged("assetId")) {
                    this.createBreadcrumbs();
                }
                if (model.hasChanged('name')) {
                    this.getView('header').reRender();
                    this.updatePageTitle();
                }
            }, this);
        },

        createBreadcrumbs() {
            this.getModelFactory().create("Asset", (model) => {
                model.id = this.model.get("assetId");
                model.fetch().then(() => {
                    this.assetModel = model;
                    this.createView('header', this.headerView, {
                        model: this.model,
                        el: '#main > .header',
                        scope: this.scope
                    });
                });
            });
        },

        getHeader() {
            let name = Handlebars.Utils.escapeExpression(this.model.get('name'));
            let assetName = Handlebars.Utils.escapeExpression(this.assetModel.get('name'));

            if (name === '') {
                name = this.model.id;
            }

            return this.buildHeaderHtml([
                '<a href="#Asset">' + this.getLanguage().translate("Asset", 'scopeNamesPlural') + '</a>',
                '<a href="#Asset/view/' + this.assetModel.get('id') + '">' + assetName + '</a>',
                this.getLanguage().translate(this.scope, 'scopeNamesPlural'),
                name
            ]);
        }
    })
);