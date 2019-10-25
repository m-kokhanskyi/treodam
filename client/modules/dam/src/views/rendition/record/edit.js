Espo.define('dam:views/rendition/record/edit', 'views/record/edit-small',
    Dep => Dep.extend({
        setup () {
            Dep.prototype.setup.call(this);
            this.skipType = this._getAssetNature() === "file" ? "image" : "file";
        },
        
        getGridLayout: function (callback) {
            if (this.gridLayout !== null) {
                callback(this.gridLayout);
                return;
            }
            
            var gridLayoutType = this.gridLayoutType || 'record';
            
            if (this.detailLayout) {
                this.gridLayout = {
                    type  : gridLayoutType,
                    layout: this.convertDetailLayout(this.detailLayout)
                };
                callback(this.gridLayout);
                return;
            }
            
            this._helper.layoutManager.get(this.model.name, this.layoutName, function (simpleLayout) {
                simpleLayout    = this._filterSimpleLayout(simpleLayout);
                this.gridLayout = {
                    type  : gridLayoutType,
                    layout: this.convertDetailLayout(simpleLayout)
                };
                callback(this.gridLayout);
            }.bind(this));
        },
    
        _filterSimpleLayout(layout) {
            for (let i = 0; layout.length > i; i++) {
                layout[i]['rows'] = this._parseRows(layout[i]['rows']);
            }
        
            return layout;
        },
        _parseRows(rows) {
            let newRows = [];
            for (let i = 0; rows.length > i; i++) {
                let row = this._parseRow(rows[i]);
                if (row.length > 0) {
                    newRows.push(row);
                }
            }
        
            return newRows;
        },
        _parseRow(row) {
            let newRow = [];
            for (let i = 0; row.length > i; i++) {
                if (row[i].name === this.skipType) {
                    continue;
                }
                newRow.push(row[i]);
            }
            return newRow;
        },
        _getAssetNature () {
            let type = this.options.assetModel.get("type").replace(" ", "-").toLowerCase();
            return this.getMetadata().get(`app.config.types.custom.${type}.nature`);
        }
    })
);