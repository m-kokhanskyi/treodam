Espo.define('dam:views/rendition/modals/edit', 'views/modals/edit',
    Dep => Dep.extend({
        fullFormDisabled: true,
        editViewName    : "dam:views/rendition/record/edit",
        
        createRecordView: function (model, callback) {
            var viewName =
                    this.editViewName ||
                    this.editView ||
                    this.getMetadata().get(['clientDefs', model.name, 'recordViews', 'editSmall']) ||
                    this.getMetadata().get(['clientDefs', model.name, 'recordViews', 'editQuick']) ||
                    'views/record/edit-small';
            let assetModel = {};
            
            if ( this.options.relate) {
                assetModel = this.options.relate.model;
    
                var options = {
                    model          : model,
                    el             : this.containerSelector + ' .edit-container',
                    type           : 'editSmall',
                    layoutName     : this.layoutName || 'detailSmall',
                    columnCount    : this.columnCount,
                    buttonsDisabled: true,
                    sideDisabled   : this.sideDisabled,
                    bottomDisabled : this.bottomDisabled,
                    assetModel     : assetModel || {},
                    exit           : function () {}
                };
                this.handleRecordViewOptions(options);
                this.createView('edit', viewName, options, callback);
            } else {
                this.getModelFactory().create("Asset", asset => {
                    asset.id = this.model.get("assetId");
                    asset.fetch().then(() => {
                        assetModel = asset;
    
                        var options = {
                            model          : model,
                            el             : this.containerSelector + ' .edit-container',
                            type           : 'editSmall',
                            layoutName     : this.layoutName || 'detailSmall',
                            columnCount    : this.columnCount,
                            buttonsDisabled: true,
                            sideDisabled   : this.sideDisabled,
                            bottomDisabled : this.bottomDisabled,
                            assetModel     : assetModel || {},
                            exit           : function () {}
                        };
                        this.handleRecordViewOptions(options);
                        this.createView('edit', viewName, options, callback);
                    });
                })
            }
        }
    })
);