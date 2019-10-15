Espo.define('dam:views/rendition_version/detail', 'dam:views/detail',
    Dep => Dep.extend({
        assetModel: null,
        renditionModel: null,

        setupHeader: function () {
            this.waitForView("header");
            if (this.model.has("renditionId")) {
                this.createBreadcrumbs();
            }

            this.listenTo(this.model, 'sync', function (model) {
                this.waitForView("header");
                if (model.hasChanged("renditionId")) {
                    this.createBreadcrumbs();
                }
                if (model.hasChanged('name')) {
                    this.getView('header').reRender();
                    this.updatePageTitle();
                }
            }, this);
        },

        createBreadcrumbs() {
            this.getModelFactory().create("Rendition", (model) => {
                model.id = this.model.get("renditionId");
                model.fetch().then(() => {
                    this.renditionModel = model;
                    this.getModelFactory().create("Asset", (model) => {
                        model.id = this.renditionModel.get('assetId');
                        model.fetch().then(() => {
                            this.assetModel = model;
                            this.createView('header', this.headerView, {
                                model: this.model,
                                el: '#main > .header',
                                scope: this.scope
                            });
                        });
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
                this.getLanguage().translate("Renditions", 'scopeNamesPlural'),
                '<a href="#Rendition/view/' + this.renditionModel.get('id') + '">' + this.renditionModel.get("name") + '</a>',
                this.getLanguage().translate(this.scope, 'scopeNamesPlural'),
                name
            ]);
        }
    }));