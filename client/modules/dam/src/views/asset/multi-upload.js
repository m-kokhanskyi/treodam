Espo.define('dam:views/asset/multi-upload', ["view", "dam:config"], function (Dep, Config) {
    return Dep.extend({
        template : "dam:asset/multi-upload",
        size     : {},
        damConfig: null,
        
        events: _.extend({
            'change input[data-name="upload"]': function (e) {
                this._uploadFiles(e.currentTarget.files);
            }
        }, Dep.prototype.events),
        
        setup() {
            this.damConfig = Config.prototype.init.call(this);
            Dep.prototype.setup.call(this);
        },
        
        _uploadFiles(files) {
            let maxUploadCount = this.getMetadata().get("app.fileStorage.maxUploadFiles");
            if (files.length > maxUploadCount) {
                this.notify(this.translate("File limit", "exceptions", "Asset"), "error");
                return false;
            }
            
            let pList = [];
            for (let i = 0; i < files.length; i++) {
                let result = this._createFile(files[i]);
                if (result !== false) {
                    pList.push(result);
                }
            }
            
            Promise.all(pList).then(r => {
                this.collection.trigger("upload:done", r);
            }).catch(r => {
                this.collection.trigger("upload:done", r);
            });
        },
        
        _sizeValidate(size) {
            let type       = this.damConfig.getType(this.model.get("type"));
            let private    = this.model.get('private') ? "private" : "public";
            let sizeParams = this.damConfig.getByType(`${type}.validations.size.${private}`);
            
            if (sizeParams && (
                size > sizeParams.max || size < sizeParams.min
            )) {
                return false;
            }
            
            return true;
        },
        
        _createFile(file) {
            let sizeValidate = this._sizeValidate((
                file.size / 1024
            ));
            
            if (!sizeValidate) {
                this.notify("Size limit", "error");
                return false;
            }
            
            return new Promise((resolve, reject) => {
                this.getModelFactory().create('Attachment', function (model) {
                    let fileReader    = new FileReader();
                    fileReader.onload = function (e) {
                        model.set('name', file.name);
                        model.set('type', file.type || 'text/plain');
                        model.set('role', 'Attachment');
                        model.set('size', file.size);
                        model.set('relatedType', "Asset");
                        model.set('file', e.target.result);
                        model.set('field', 'file');
                        model.set('modelAttributes', this.model);
                        model.save({}, {timeout: 0}).then(function () {
                            this.collection.push(model);
                            resolve();
                        }.bind(this)).fail(function () {
                            resolve();
                        }.bind(this));
                    }.bind(this);
                    fileReader.readAsDataURL(file);
                    
                }.bind(this));
            });
        }
    });
});