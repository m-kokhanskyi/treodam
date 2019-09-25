Espo.define('dam:views/fields/attributes', 'views/fields/text', function (Dep) {

    return Dep.extend({

        listTemplate: "dam:asset_relation/fields/attributes/list",
        editTemplate: "dam:asset_relation/fields/attributes/edit",
        detailTemplate: "dam:asset_relation/fields/attributes/detail",
        rows: [],

        events: {
            "click button[data-name='add-attr-view']": function (e) {
                this.addNewRow();
            }
        },

        data() {
            return {
                values: this._buildAttributesList(),
                rows: this.rows
            }
        },

        setup() {
            this.rows = [];
            Dep.prototype.setup.call(this);
            this._buildAttributesCollection();
        },

        addNewRow() {
            let row = "AttributeRow" + Math.floor((Math.random() * 10000) + 1);
            $(this.options.el).find("table > tbody").append($("<tr/>", {
                "data-name": row
            }));

            this.getModelFactory().create(row, model => {
                this.createView(row, "dam:views/asset_relation/record/modals/attribute-row", {
                    el: this.options.el + ' tr[data-name="' + row + '"]',
                    model: model,
                    enableAttr: this._getAttributesList()
                }, view => {
                    this._bindListeners(view, row);
                    view.render();
                })
            });
        },
        _getAttributesList() {
            let assetType = this.getAssetType();
            return this.getMetadata().get(['app', 'config', 'types', 'custom', assetType, 'attributes']);
        },

        _getEnableAttributes() {
            let list = this._getAttributesList();

            console.log(this.nestedViews);
        },

        _bindListeners(view, row) {
            view.listenToOnce(view, "remove", () => {
                delete this.nestedViews[row];
                for (let name in this.nestedViews) {
                    this.nestedViews[name].reRender();
                }
            });
            view.listenTo(view, "after:change-type", () => {
                for (let name in this.nestedViews) {
                    this.nestedViews[name].reRender();
                }
            });
        },

        _buildAttributesList() {

            if (this.options.mode !== "list") {
                return false;
            }

            let jsonString = this.model.get('attributes');

            if (jsonString === null || !jsonString.length) {
                return false;
            }

            return JSON.parse(jsonString);
        },

        _buildAttributesCollection() {
            if (this.options.mode !== "edit") {
                return false;
            }

            let jsonAttr = JSON.parse(this.model.get("attributes"));

            for (let name in jsonAttr) {
                let row = "AttributeRow" + Math.floor((Math.random() * 10000) + 1);
                this.getModelFactory().create(row, model => {

                    model.set("selected", name);
                    model.set("value", jsonAttr[name]);

                    this.createView(row, "dam:views/asset_relation/record/modals/attribute-row", {
                        el: this.options.el + ' tr[data-name="' + row + '"]',
                        model: model,
                        enableAttr: this._getAttributesList()
                    }, view => {
                        this._bindListeners(view, row);
                    });
                    this.rows.push(row);
                });
            }
        },

        _transformAssetType (type) {
            return type.toLowerCase().replace(" ", "-");
        },

        fetch() {
            let data = {};
            let res = {};

            for (let key in this.nestedViews) {
                let model = this.nestedViews[key].model;
                res[model.get("selected")] = model.get("value");
            }

            data[this.name] = JSON.stringify(res);
            return data;
        },
    });
});