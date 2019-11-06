Espo.define('dam:views/asset/fields/file', 'dam:views/fields/file',
    Dep => Dep.extend({
        setup () {
            Dep.prototype.setup.call(this);
            
            this.listenTo(this.model, "change:type", () => {
                this.deleteAttachment();
            });
        }
    })
);