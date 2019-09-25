Espo.define('dam:views/asset_relation/record/panels/asset-type-block', 'view',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/panels/asset-type-block",

        setup() {
            Dep.prototype.setup.call(this);
            this.createHeaderBlock();
        },

        createHeaderBlock() {
            this.createView("headerBlock", "dam:views/asset_relation/record/panels/header", {
                model: this.model,
                el: this.options.el + " .group-name"
            });
        },

        showInfo() {
            if (this.collection) {
                this.collection.fetch().then(() => {
                    this.showItems();
                });
            } else {
                this.getCollectionFactory().create("AssetRelation", (collection) => {
                    collection.url = "AssetRelation";

                    collection.fetch().then(() => {
                        this.collection = collection;
                        this.showItems();
                    });
                });
            }
        },

        showItems() {
            if (this.hasView("rows")) {
                let view = this.getView("rows");

                view.reRender();
            } else {
                this.createView("rows", "dam:views/asset_relation/record/panels/rows", {
                    model: this.model,
                    el: this.options.el + " .list-container",
                    collection: this.collection,
                    assetRelationLayoutList: this.options.assetRelationLayoutList || {}
                }, view => {
                    view.listenTo(view, "after:render", () => {
                        $(view.el).find('.list').slideDown("fast");
                    });
                    view.render();
                });
            }
        },

        hideInfo() {
            if (this.hasView("rows")) {
                let view = this.getView("rows");
                $(view.el).find(".list").slideUp("fast");
            }
        }
    })
);