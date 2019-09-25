Espo.define('dam:views/asset_relation/record/panels/row', 'view',
    Dep => Dep.extend({

        template: "dam:asset_relation/record/panels/row",

        setup() {
            Dep.prototype.setup.call(this);

            this.createSort();
            this.createPreview();
            this.createList();
        },

        createSort() {
            this.createView("sort", "dam:views/asset_relation/record/panels/row/sort", {
                model: this.model,
                el: this.options.el + " .sort"
            });
        },

        createPreview() {
            this.createView("preview", "dam:views/asset_relation/record/panels/row/preview", {
                model: this.model,
                el: this.options.el + " .preview"
            });
        },

        createList() {
            this.createView("mainTable", "dam:views/asset_relation/record/panels/row/table", {
                model: this.model,
                el: this.options.el + " .main-list",
                assetRelationLayoutList: this.options.assetRelationLayoutList || {}
            });
        }
    }),
);