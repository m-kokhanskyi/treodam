Espo.define('dam:views/modals/image-preview', 'views/modals/image-preview', function (Dep) {
    return Dep.extend({
        template: "dam:modals/image-preview",
        
        getImageUrl() {
            return `${this.getBasePath()}?entryPoint=preview&type=attachment&size=original&id=${this.options.id}`;
        }
    });
});