Espo.define('dam:views/dam-config/index', 'view',
    Dep => Dep.extend({
        template: "dam:dam-config/index",
        
        setup() {
            Dep.prototype.setup.call(this);
            
            this.createEditorView();
        },
        
        createEditorView() {
            this.createView("editor", "dam:views/dam-config/editor", {
                "el" : this.options.el + " > .import-container"
            });
        }
    })
);