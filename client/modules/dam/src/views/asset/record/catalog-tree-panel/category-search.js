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

Espo.define('dam:views/asset/record/catalog-tree-panel/category-search', 'view',
    Dep => Dep.extend({

        template: 'dam:asset/record/catalog-tree-panel/category-search',

        data() {
            return {
                scope: this.scope
            }
        },

        setup() {
            this.scope = this.options.scope || this.scope;
        },

        afterRender() {
            if (this.el) {
                this.$el.find('input').autocomplete({
                    serviceUrl: function () {
                        return this.getAutocompleteUrl();
                    }.bind(this),
                    paramName: 'q',
                    minChars: 1,
                    autoSelectFirst: true,
                    transformResult: function (json) {
                        let response = JSON.parse(json);
                        let list = [];
                        response.list.forEach(category => {
                            let firstParentId;
                            if (category.categoryRoute) {
                                firstParentId = category.categoryRoute.split('|').find(element => element);
                            }
                            this.options.catalogs.forEach(catalog => {
                                if ((catalog.assetCategoriesIds || []).includes(category.id) || (firstParentId && (catalog.assetCategoriesIds || []).includes(firstParentId))) {
                                    let modifiedItem = Espo.Utils.cloneDeep(category);
                                    modifiedItem.value = catalog.name + ' > ' + modifiedItem.name;
                                    modifiedItem.catalogId = catalog.id;
                                    list.push(modifiedItem);
                                }
                            });
                        });
                        return {
                            suggestions: list
                        };
                    }.bind(this),
                    onSelect: function (category) {
                        this.$el.find('input').val('');
                        this.trigger('category-search-select', category);
                    }.bind(this)
                });
            }
        },

        getAutocompleteUrl() {
            let url = 'AssetCategory?sortBy=createdAt';
            let where = [];
            where.push({type: 'bool', value: ['onlyActive']});
            url += '&' + $.param({'where': where});
            return url;
        }

    })
);