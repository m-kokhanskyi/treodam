Espo.define('dam:views/asset_version/modals/image-preview', 'dam:views/modals/image-preview',
    Dep => Dep.extend({
        getImageUrl() {
            return `${this.getBasePath()}?entryPoint=versions&event=download&type=asset&id=${this.options.id}`;
        }
    })
);