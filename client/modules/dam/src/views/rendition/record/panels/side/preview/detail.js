Espo.define('dam:views/rendition/record/panels/side/preview/detail', 'view',
    Dep => Dep.extend({
        template: "dam:rendition/record/panels/side/preview/detail",
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
        
        data() {
            return {
                show: this._show()
            };
        },
        
        _show() {
            return this.getMetadata().get(`app.config.renditions.${this.model.get("type")}.preview`)
                || this.getMetadata().get(`app.config.renditions.${this.model.get("type")}.nature`) === "image"
                || false;
        }
    })
);