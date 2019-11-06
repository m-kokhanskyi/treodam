Espo.define('dam:views/rendition_version/modals/image-preview', 'dam:views/modals/image-preview',
    Dep => Dep.extend({
        getImageUrl() {
            return `${this.getBasePath()}?entryPoint=versions&event=download&type=rendition&id=${this.options.id}`;
        }
    })
);