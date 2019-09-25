Espo.define('dam:views/asset_relation/record/panels/row/table', 'view',
    Dep => Dep.extend({

        template: "dam:asset_relation/record/panels/row/main-table",

        listLayout: [],

        _internalLayoutType: 'list-row',

        rowActionsView: 'views/record/row-actions/default',

        rowActionsColumnWidth: 25,

        events: {
            'click .action': function (e) {
                var $el = $(e.currentTarget);
                var action = $el.data('action');
                var method = 'action' + Espo.Utils.upperCaseFirst(action);
                if (typeof this[method] == 'function') {
                    var data = $el.data();
                    this[method](data, e);
                    e.preventDefault();
                }
            },
        },

        data() {
            return {
                "header": this._getHeader()
            }
        },

        setup() {
            this.listLayout = this.options.assetRelationLayoutList || {};
            this.getInternalLayout();
        },

        _getHeader() {
            let defs = [];

            for (let i in this.listLayout) {
                let width = false;

                if ('width' in this.listLayout[i] && this.listLayout[i].width !== null) {
                    width = this.listLayout[i].width + '%';
                } else if ('widthPx' in this.listLayout[i]) {
                    width = this.listLayout[i].widthPx;
                }

                let item = {
                    name: this.listLayout[i].name,
                    sortable: !(this.listLayout[i].notSortable || false),
                    width: width,
                    align: ('align' in this.listLayout[i]) ? this.listLayout[i].align : false,
                };
                if ('customLabel' in this.listLayout[i]) {
                    item.customLabel = this.listLayout[i].customLabel;
                    item.hasCustomLabel = true;
                }
                defs.push(item);
            }

            if (this.rowActionsView && !this.rowActionsDisabled) {
                defs.push({
                    width: this.rowActionsColumnWidth
                });
            }
            return defs;
        },

        getInternalLayout() {
            let acl = {
                edit: this.getAcl().checkModel(this.model, 'edit'),
                delete: this.getAcl().checkModel(this.model, 'delete')
            };
            this.createView("row", 'views/base', {
                model: this.model,
                acl: acl,
                el: this.options.el + ' tr[data-name="' + this.model.id + '"]',
                optionsToPass: ['acl'],
                noCache: true,
                _layout: {
                    type: this._internalLayoutType,
                    layout: this._convertLayout()
                },
                name: this.type + '-' + this.model.name,
                setViewBeforeCallback: this.options.skipBuildRows && !this.isRendered()
            });
        },

        _convertLayout() {
            let layout = [];


            for (let i in this.listLayout) {
                let col = this.listLayout[i];
                let type = col.type || this.model.getFieldType(col.name) || 'base';
                if (!col.name) {
                    continue;
                }

                let item = {
                    columnName: col.name,
                    name: col.name + 'Field',
                    view: col.view || this.model.getFieldParam(col.name, 'view') || this.getFieldManager().getViewName(type),
                    options: {
                        defs: {
                            name: col.name,
                            params: col.params || {}
                        },
                        mode: 'list'
                    }
                };
                if (col.width) {
                    item.options.defs.width = col.width;
                }
                if (col.widthPx) {
                    item.options.defs.widthPx = col.widthPx;
                }

                if (col.link) {
                    item.options.mode = 'listLink';
                }
                if (col.align) {
                    item.options.defs.align = col.align;
                }
                layout.push(item);
            }
            if (this.rowActionsView && !this.rowActionsDisabled) {
                layout.push(this.getRowActionsDefs());
            }
            return layout;
        },

        getRowActionsDefs: function () {
            return {
                columnName: 'buttons',
                name: 'buttonsField',
                view: this.rowActionsView,
                options: {
                    defs: {
                        params: {}
                    }
                }
            };
        },

        actionQuickEdit: function (data) {

            data = data || {}
            var id = data.id;
            if (!id) return;

            if (!data.scope && !this.model) {
                return;
            }

            var scope = data.scope || this.model.name || this.scope;

            var viewName = this.getMetadata().get('clientDefs.' + scope + '.modalViews.edit') || 'views/modals/edit';

            Espo.Ui.notify(this.translate('loading', 'messages'));
            var options = {
                scope: scope,
                id: id,
                model: this.model,
                fullFormDisabled: data.noFullForm,
                returnUrl: this.getRouter().getCurrentUrl(),
                returnDispatchParams: {
                    controller: scope,
                    action: null,
                    options: {
                        isReturn: true
                    }
                }
            };
            if (this.options.keepCurrentRootUrl) {
                options.rootUrl = this.getRouter().getCurrentUrl();
            }
            this.createView('modal', viewName, options, function (view) {
                view.once('after:render', function () {
                    Espo.Ui.notify(false);
                });

                view.render();

                this.listenToOnce(view, 'remove', function () {
                    this.clearView('modal');
                }, this);

                this.listenToOnce(view, 'after:save', function (m) {
                    this.model.set(m.getClonedAttributes());
                    this.reRender();
                }, this);
            }, this);
        }
    })
);