Espo.define('dam:views/asset_relation/record/panels/asset-type-block', 'view',
    Dep => Dep.extend({
        template: "dam:asset_relation/record/panels/asset-type-block",

        setup() {
            Dep.prototype.setup.call(this);
            this.createHeaderBlock();
            if (this.options.show) {
                this.showInfo();
            }
        },

        createHeaderBlock() {
            this.createView("headerBlock", "dam:views/asset_relation/record/panels/header", {
                model: this.model,
                el: this.options.el + " .group-name",
                show : this.options.show || false
            });
        },

        showInfo() {
            if (this.collection) {
                this.getView("list").reRender();
            } else {
                this.getCollectionFactory().create("AssetRelation", (collection) => {
                    collection.url = `AssetRelation/byEntity/${this.model.get('entityName')}/${this.model.get('entityId')}?type=${this.model.get('name')}`;

                    this.collection = collection;
                    this.createView('list', "views/record/list", {
                        collection: this.collection,
                        model: this.model,
                        buttonsDisabled: true,
                        checkboxes: false,
                        el: this.options.el + ' .list-container',
                        layoutName: "listSmall",
                        dragableListRows: true,
                        listRowsOrderSaveUrl: `AssetRelation/${this.model.get('entityName')}/${this.model.get('entityId')}/sortOrder`,
                        listLayout: null,
                        skipBuildRows: true
                    }, function (view) {
                        view.listenTo(collection, "sync", () => {
                            $(view.el).find('.list').slideDown("fast");
                        });
                        collection.fetch();
                    });
                });
            }
        },

        hideInfo() {
            if (this.hasView("list")) {
                let view = this.getView("list");
                $(view.el).find(".list").slideUp("fast");
            }
        }
    })
);