Espo.define('dam:views/asset/record/panels/side/download/custom', 'view',
    Dep => {
        return Dep.extend({
            template     : "dam:asset/record/panels/side/download/custom",
            downloadModel: {},
            active       : false,
            
            events: {
                'change input': function (e) {
                    let $el  = $(e.currentTarget);
                    let name = $el.prop("name");
                    this.downloadModel.set(name, $el.val());
                }
            },
            
            data() {
                return {
                    downloadModel: this.downloadModel
                };
            },
            
            setup() {
                Dep.prototype.setup.call(this);
                this._createModel();
            },
            
            hide() {
                this.active = false;
                this.$el.find(".additional-panel").hide();
            },
            
            show() {
                this.active = true;
                this.$el.find(".additional-panel").show();
            },
            
            buildUrl() {
                let attachmentId = this.model.get("fileId") || this.model.get("imageId");
                return `?entryPoint=download&id=${attachmentId}` + "&" +
                    `width=${this.downloadModel.get("width")}` + "&" +
                    `height=${this.downloadModel.get("height")}` + "&" +
                    `quality=${this.downloadModel.get("quality")}` + "&" +
                    `scale=${this._getScale()}` + "&" +
                    `format=${this._getFormat()}` + "&" +
                    `type=custom`;
                
            },
            
            _getScale() {
                return this.$el.find('select[name="scale"]').val()
            },
            
            _getFormat() {
                return this.$el.find('select[name="format"]').val()
            },
            
            _createModel() {
                this.getModelFactory().create("downloadModel", model => {
                    model.set("width", this.model.get("width"));
                    model.set("height", this.model.get("height"));
                    model.set("quality", 100);
                    
                    this.downloadModel = model;
                    model.listenTo(model, "change:quality", () => {
                        if (parseInt(model.get('quality')) > 100) {
                            model.set("quality", 100);
                            this.$el.find('input[name="quality"]').val(100);
                        }
                        if (parseInt(model.get('quality')) <= 0) {
                            model.set("quality", 1);
                            this.$el.find('input[name="quality"]').val(1);
                        }
                    });
                    
                    model.listenTo(model, "change:width", () => {
                        if (parseInt(model.get('width')) < 1) {
                            model.set("width", 1);
                            this.$el.find('input[name="width"]').val(1);
                        }
                    });
                    
                    model.listenTo(model, "change:height", () => {
                        if (parseInt(model.get('height')) < 1) {
                            model.set("height", 1);
                            this.$el.find('input[name="height"]').val(1);
                        }
                    });
                });
            }
        });
    }
);