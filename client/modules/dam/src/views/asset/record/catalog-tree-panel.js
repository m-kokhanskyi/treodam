/*
 * Pim
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

Espo.define('dam:views/asset/record/catalog-tree-panel', 'view',
    Dep => Dep.extend({

        template: 'dam:asset/record/catalog-tree-panel',

        categories: [],

        events: {
            'click .category-buttons button[data-action="selectAll"]': function (e) {
                this.selectCategoryButtonApplyFilter($(e.currentTarget), {type: 'anyOf'});
            },
            'click .category-buttons button[data-action="selectWithoutCategory"]': function (e) {
                this.selectCategoryButtonApplyFilter($(e.currentTarget), {type: 'isEmpty'});
            },
            'click button[data-action="collapsePanel"]': function () {
                this.actionCollapsePanel();
            }
        },

        data() {
            return {
                scope: this.scope,
                catalogDataList: this.getCatalogDataList()
            }
        },

        setup() {
            this.scope = this.options.scope || this.scope;
            this.wait(true);

            this.getFullEntity('AssetCategory', {select: 'name,categoryParentId'}, categories => {
                this.categories = categories;
                this.setupPanels();
                this.wait(false);
            });

            this.listenTo(this, 'resetFilters', () => {
                this.selectCategoryButtonApplyFilter(this.$el.find('button[data-action="selectAll"]'), false);
            });
        },

        getFullEntity(url, params, callback, container) {
            if (url) {
                container = container || [];
                let options = params || {};
                options.maxSize = options.maxSize || 200;
                options.offset = options.offset || 0;

                this.ajaxGetRequest(url, options).then(response => {
                    container = container.concat(response.list || []);
                    options.offset = container.length;
                    if (response.total > container.length || response.total === -1) {
                        this.getFullEntity(url, options, callback, container);
                    } else {
                        callback(container);
                    }
                });
            }
        },

        afterRender() {
            Dep.prototype.afterRender.call(this);

            if ($(window).width() <= 767 || !!this.getStorage().get('catalog-tree-panel', this.scope)) {
                this.actionCollapsePanel();
            }
        },

        selectCategoryButtonApplyFilter(button, filterParams) {
            this.selectCategoryButton(button);
            if ($(window).width() <= 767) {
                this.actionCollapsePanel(true);
            }
            if (filterParams) {
                this.applyCategoryFilter(filterParams.type);
            }
        },

        setupPanels() {
            this.createView('categorySearch', 'dam:views/asset/record/catalog-tree-panel/category-search', {
                el: '.catalog-tree-panel > .category-panel > .category-search',
                scope: this.scope,
                categories: this.categories
            }, view => {
                view.render();
                this.listenTo(view, 'category-search-select', category => {
                    this.selectCategory(category, true);
                });
            });
            this.createView(`category-tree[jhjij`, 'dam:views/asset/record/catalog-tree-panel/category-tree', {
                el: `${this.options.el} > .category-panel > .category-tree`,
                scope: this.scope,
                categories: this.categories
            }, view => {
                view.render();
                view.listenTo(view, 'category-tree-select', category => {
                    this.selectCategory(category);
                });
            });
        },

        selectCategory(category, notSkipCollapse) {
            if (category && category.id && category.catalogId) {
                this.setCategoryActive(category.id, category.catalogId);
                if ($(window).width() <= 767) {
                    this.actionCollapsePanel();
                }
                if (notSkipCollapse) {
                    this.collapseCategory(category.id, category.catalogId);
                }
                this.applyCategoryFilter('anyOf', category);
            }
        },

        applyCategoryFilter(type, category) {
            let data = {};
            if (type === 'isEmpty') {
                data.advanced = {
                    productCategories: {
                        type: 'isNotLinked',
                        data: {
                            type: type
                        }
                    }
                };
            } else if (type === 'anyOf' && category) {
                data.bool = {
                    linkedWithCategory: true
                };
                data.boolData = {
                    linkedWithCategory: category.id
                };
                data.advanced = {
                    catalog: {
                        type: 'equals',
                        field: 'catalogId',
                        value: category.catalogId,
                        data: {
                            type: 'is',
                            idValue: category.catalogId,
                            nameValue: (this.catalogs.find(catalog => catalog.id === category.catalogId) || {}).name
                        }
                    }
                };
            }
            this.trigger('select-category', data);
        },

        collapseCategory(id, catalogId) {
            let activeCategory = this.$el.find(`.panel[data-name="${catalogId}"] li.child[data-id="${id}"]:eq()`);
            activeCategory.parents('.panel-collapse.collapse').collapse('show');
        },

        setCategoryActive(id, catalogId) {
            this.$el.find('.category-buttons > button').removeClass('active');
            this.$el.find('ul.list-group-tree li.child').removeClass('active');
            if (catalogId) {
                this.$el.find(`.panel[data-name="${catalogId}"] li.child[data-id="${id}"]:eq()`).addClass('active');
            } else {
                this.$el.find(`li.child[data-id="${id}"]:eq()`).addClass('active');
            }
        },

        selectCategoryButton(button) {
            this.$el.find('.panel-collapse.collapse[class^="catalog-"].in').collapse('hide');
            this.$el.find('ul.list-group-tree li.child').removeClass('active');
            this.$el.find('.category-buttons > button').removeClass('active');
            button.addClass('active');
        },

        actionCollapsePanel(forceHide) {
            let categoryPanel = this.$el.find('.category-panel');
            let button = this.$el.find('button[data-action="collapsePanel"]');
            let listContainer = this.$el.parent('#main').find('.list-container');
            if (categoryPanel.hasClass('hidden') && !forceHide) {
                categoryPanel.removeClass('hidden');
                button.removeClass('collapsed');
                button.find('span.toggle-icon-left').removeClass('hidden');
                button.find('span.toggle-icon-right').addClass('hidden');
                this.$el.removeClass('catalog-tree-panel-hidden');
                this.$el.addClass('col-xs-12 col-lg-3');
                listContainer.removeClass('hidden-catalog-tree-panel');
                listContainer.addClass('col-xs-12 col-lg-9');
                this.getStorage().set('catalog-tree-panel', this.scope, '');
            } else {
                categoryPanel.addClass('hidden');
                button.addClass('collapsed');
                button.find('span.toggle-icon-left').addClass('hidden');
                button.find('span.toggle-icon-right').removeClass('hidden');
                this.$el.removeClass('col-xs-12 col-lg-3');
                this.$el.addClass('catalog-tree-panel-hidden');
                listContainer.removeClass('col-xs-12 col-lg-9');
                listContainer.addClass('hidden-catalog-tree-panel');
                this.getStorage().set('catalog-tree-panel', this.scope, 'collapsed');
            }
            $(window).trigger('resize');
        },

        getCatalogDataList: function () {
            return {
                key: `category-tree`,
                name: "root"
            };
        },
    })
);