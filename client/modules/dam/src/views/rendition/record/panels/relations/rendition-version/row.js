Espo.define('dam:views/rendition/record/panels/relations/rendition-version/row', 'views/record/row-actions/relationship',
    Dep => {
        return Dep.extend({
            
            events: _.extend(Dep.prototype.events, {
                'click .action': function (e) {
                    var $el    = $(e.currentTarget);
                    var action = $el.data('action');
                    var method = 'action' + Espo.Utils.upperCaseFirst(action);
                    if (typeof this[method] === 'function') {
                        var data = $el.data();
                        this[method](data, e);
                    }
                }
            }),
            
            getActionList: function () {
                let list = [];
                
                list.push({
                    action: 'removeRelated',
                    label : 'Remove',
                    data  : {
                        id: this.model.id
                    }
                });
                
                list.push({
                    action: "downloadVersion",
                    label : "Download",
                    data  : {
                        id: this.model.id
                    }
                });
                
                if (this._hasPreview()) {
                    list.push({
                        action: "showPreview",
                        label : "Preview"
                    });
                }
                
                return list;
            },
            
            actionShowPreview() {
                this.createView('preview', 'dam:views/rendition_version/modals/image-preview', {
                    id   : this.model.get('id'),
                    model: this.model
                }, function (view) {
                    view.render();
                });
            },
            
            actionDownloadVersion(data, e) {
                let $el = $(e.currentTarget);
                $el.prop("href", `?entryPoint=versions&event=download&type=rendition&id=${data.id}`);
            },
            
            _hasPreview() {
                let renditionView = this.getParentView()
                    .getParentView()
                    .getParentView();
                
                let type   = renditionView.model.get("type").replace(" ", "-").toLowerCase();
                let nature = this.getMetadata().get(`app.config.renditions.${type}.nature`);
                
                return nature === "image";
            }
        });
    }
);