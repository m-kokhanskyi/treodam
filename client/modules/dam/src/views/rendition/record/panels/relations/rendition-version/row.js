Espo.define('dam:views/rendition/record/panels/relations/rendition-version/row',
    ["views/record/row-actions/relationship", "dam:config"],
    (Dep, Config) => {
        return Dep.extend({
            assetType    : null,
            renditionType: null,
            damConfig    : null,
            actionList   : [],
            
            setup() {
                this.damConfig = Config.prototype.init.call(this);
                Dep.prototype.setup.call(this);
                
                this.initActionList();
            },
            
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
            
            initActionList() {
                this.actionList = [];
                
                this.actionList.push({
                    action: 'removeRelated',
                    label : 'Remove',
                    data  : {
                        id: this.model.id
                    }
                });
                
                this.actionList.push({
                    action: "downloadVersion",
                    label : "Download",
                    data  : {
                        id: this.model.id
                    }
                });
                
                this.listenToOnce(this, "after:render", () => {
                    this.checkToShowPreview();
                });
            },
            
            getActionList: function () {
                return this.actionList;
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
            
            checkToShowPreview() {
                let renditionModel = this.getParentView()
                    .getParentView()
                    .getParentView()
                    .model;
                
                this.getModelFactory().create("Asset", model => {
                    model.id = renditionModel.get("assetId");
                    model.fetch().then(() => {
                        
                        this.assetType = this.damConfig.getType(model.get("type"));
    
                        let renditionType = renditionModel.get("type");
                        let showPreview   = this.damConfig.getByType(`${this.assetType}.renditions.${renditionType}.nature`) === "image";
    
                        if (showPreview) {
                            this.actionList.push({
                                action: "showPreview",
                                label : "Preview"
                            });
                            this.reRender();
                        }
                    });
                });
            }
        });
    }
);