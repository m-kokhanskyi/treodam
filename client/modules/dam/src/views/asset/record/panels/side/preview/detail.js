Espo.define('dam:views/asset/record/panels/side/preview/detail', 'view',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/side/preview/detail",
            events  : {
                'click a[data-action="showImagePreview"]': function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    let id = $(e.currentTarget).data('id');
                    this.createView('preview', 'dam:views/modals/image-preview', {
                        id   : id,
                        model: this.model
                    }, function (view) {
                        view.render();
                    });
                }
            },
            setup() {
                Dep.prototype.setup.call(this);
                this.listenTo(this.model, "change:fileId", () => {
                    this.reRender();
                });
            },
            data() {
                return {
                    isImage: this._isImage()
                };
            },
            _isImage() {
                if (this.model.get("type")) {
                    let type = this.model.get("type").replace(" ", "-").toLowerCase();
                    return this.getMetadata().get(`app.config.types.custom.${type}.preview`)
                        || this.getMetadata().get(`app.config.types.custom.${type}.nature`) === "image";
                    
                }
                return false;
            }
        });
    }
);