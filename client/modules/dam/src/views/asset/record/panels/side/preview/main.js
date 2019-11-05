Espo.define('dam:views/asset/record/panels/side/preview/main', 'view',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/side/preview/main",
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
                    showImage: this._showImage()
                };
            },
            _showImage() {
                return !!(
                    this._isImage() && this._hasImage()
                );
            },
            _hasImage() {
                return this.model.has("fileId") && this.model.get("fileId");
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