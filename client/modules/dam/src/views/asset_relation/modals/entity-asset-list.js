Espo.define('dam:views/asset_relation/modals/entity-asset-list', 'views/modal', function (Dep) {
    return Dep.extend({
        template: "dam:asset_relation/modals/entity-asset-list",
        items   : [],
        
        data() {
            return {
                items: this.items
            };
        },
        
        setup() {
            this.header = this.getLanguage().translate("Create Entity Assets", 'labels', this.scope);
            
            this.addButton({
                name : "save",
                label: "Save",
                style: 'primary'
            });
            
            this.addButton({
                name : "cancel",
                label: "Cancel"
            });
            
            this._renderItems();
        },
        
        _renderItems() {
            this.items = [];
            
            this.collection.forEach((model) => {
                let viewName = `entityAsset-${model.id}`;
                this.items.push(viewName);
                this.createView(viewName, "dam:views/asset_relation/modals/entity-asset-item", {
                    model: model,
                    el   : this.options.el + ` tr[data-name="${viewName}"]`
                });
            });
        },
        
        actionSave() {
            this.collection.forEach(model => {
                model.save().then(() => {
                    this.notify('Linked', 'success');
                    this.dialog.close();
                });
            })
        }
    });
});