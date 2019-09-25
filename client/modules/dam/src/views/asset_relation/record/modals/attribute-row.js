Espo.define('dam:views/asset_relation/record/modals/attribute-row', 'view',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/modals/attribute-row",

        setup() {
            this._createNameView();
            this._createValueView();
        },

        events: {
            'click td[data-name="remove"] > button': function (e) {
                this.model.destroy();
                this.remove();
            },
            'input td[data-name="attr-value"] > input ': function (e) {
                this.model.set("value", $(e.currentTarget).val());
            },
            "change td[data-name='attr-name'] > select" : function (e) {
                this.model.set("selected", $(e.currentTarget).val());
                this.trigger("after:change-type");
            }
        },

        _createNameView() {

            this.getParentView()

            this.createView("name", "views/fields/enum", {
                model: this.model,
                mode: 'edit',
                el: this.options.el + ' .tr[data-name="attr-name"]',
                defs: {
                    name: 'selected',
                    params: {
                        required: true,
                        options: this.options.enableAttr
                    }
                },
                tooltip: true
            })
        }
        ,

        _createValueView() {
            this.createView("value", "views/fields/varchar", {
                el: this.options.el + ' .tr[data-name="attr-value"]',
                model: this.model,
                name: 'value',
                mode: 'edit',
                params: {
                    trim: true,
                    required: true,
                    readOnly: !!this.id
                }
            });
        }
    })
)
;