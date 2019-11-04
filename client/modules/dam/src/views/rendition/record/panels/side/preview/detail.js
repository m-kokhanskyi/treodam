Espo.define('dam:views/rendition/record/panels/side/preview/detail', 'view',
    Dep => Dep.extend({
        template: "dam:rendition/record/panels/side/preview/detail",
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