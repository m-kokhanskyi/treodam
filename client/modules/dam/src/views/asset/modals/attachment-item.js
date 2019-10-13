Espo.define('dam:views/asset/modals/attachment-item', ['view', "dam:views/fields/code-from-name"], function (Dep, Code) {
    return Dep.extend({
        template: "dam:asset/modals/attachment-item",
        type    : null,
        
        events: {
            'click span[data-action="collapsePanel"]'   : function (e) {
                let obj = $(e.currentTarget);
                obj.toggleClass("fa-chevron-up").toggleClass("fa-chevron-down");
                obj.parents(".media-body").find('.edit-form').slideToggle();
            },
            'click span[data-action="deleteAttachment"]': function (e) {
                this.model.destroy({
                    wait   : true,
                    success: () => {
                        this.notify('Removed', 'success');
                        this.remove();
                        this.trigger("attachment:remove");
                    }
                });
            }
        },
        data() {
            return {
                'preview': `?entryPoint=image&size=small&id=${this.model.id}`,
                'name'   : this.model.get("name"),
                'size'   : (
                    parseInt(this.model.get("size")) / 1024
                ).toFixed(2) + " kb"
            };
        },
        setup() {
            this.type = this.options.type || null;
            
            this.getModelFactory().create("Asset", model => {
                model.set("type", this.type);
                model.set("imageId", this.model.id);
                model.set("imageName", this.model.get("name"));
                model.set("name", this._getFileName(this.model.get("name")));
                model.set("nameOfFile", this._getFileName(this.model.get("name")));
                model.set("code", Code.prototype.transformToPattern.call(this, this._getFileName(this.model.get("name"))));
                
                model.trigger("change:name");
                
                this.model.set("assetModel", model);
                this.createView("edit", "dam:views/asset/modals/asset-form", {
                    model: model,
                    el   : this.options.el + " .edit-form"
                });
            });
        },
        
        _getFileName(name) {
            name = name.split('.');
            name.pop();
            return name.join('.');
        }
    });
});