Espo.define('dam:views/rendition/fields/file', 'dam:views/fields/file', function (Dep) {
    return Dep.extend({
        setup () {
            Dep.prototype.setup.call(this);
            let isAuto = this.getMetadata().get(`app.config.renditions.${this.model.get('type')}.auto`);
            
            if (isAuto) {
                this.readOnly = true;
            }
        }
    });
});