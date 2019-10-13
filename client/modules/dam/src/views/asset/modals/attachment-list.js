Espo.define('dam:views/asset/modals/attachment-list', 'view', function (Dep) {
    return Dep.extend({
        template: "dam:asset/modals/attachment-list",
        items   : [],
        
        data() {
            return {
                items: this.items
            };
        },
        
        setup() {
            this.items = [];
            this.collection.forEach((attachment) => {
                let name = `attachment-${attachment.get('id')}`;
                this.createView(name, "dam:views/asset/modals/attachment-item", {
                    el   : this.options.el + ` tr[data-name="${name}"]`,
                    model: attachment,
                    type : this.model.get('type')
                }, view => {
                    this.items.push(name);
                    view.listenTo(view, "attachment:remove", () => {
                    debugger;
                        this.reRender();
                    });
                });
            });
        }
    });
});