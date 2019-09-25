Espo.define('dam:views/asset_relation/record/panels/rows', 'view',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/panels/rows",
        rows: [],

        data() {
            return {
                rows: this.rows
            }
        },

        setup() {
            this.rows = [];

            this.collection.forEach((model) => {
                this.createRow(model);
            });
        },

        createRow(model) {
            this.rows.push(model.id);
            this.createView(model.id, "dam:views/asset_relation/record/panels/row", {
                model: model,
                el: this.options.el + ' .row[data-id="' + model.id + '"]',
                assetRelationLayoutList : this.options.assetRelationLayoutList || {}
            });
        },

        afterRender() {
            Dep.prototype.afterRender.call(this);
            $('.sortable-row').sortable({
                connectWith: ".sortable-row",
                placeholder: "portlet-placeholder ui-corner-all",
                handle: ".flaticon-move-arrows",
                axis: "y",
                start: (event, ui) => {
                    $(".portlet-placeholder").css("height", ui.item.outerHeight());
                }
            });
        }
    })
);