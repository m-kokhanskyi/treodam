Espo.define('dam:views/asset/multi-upload', "view", function (Dep) {
    return Dep.extend({
        template: "dam:asset/multi-upload",
        events  : _.extend({
            'change input[data-name="upload"]': function (e) {
                this._uploadFiles(e.currentTarget.files);
            }
        }, Dep.prototype.events),
        
        _uploadFiles(files) {
            let pList = [];
            for (let i = 0; i < files.length; i++) {
                pList.push(this._createFile(files[i]));
            }
            
            Promise.all(pList).then(r => {
                this.collection.trigger("upload:done", r);
            }).catch(r => {
                if (this.collection.length > 0) {
                    this.collection.trigger("upload:done", r);
                }
            });
        },
        
        _createFile(file) {
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
                        model.set('field', "image");
                        model.set('modelAttributes', this.model);
                        model.save({}, {timeout: 0}).then(function () {
                            this.collection.push(model);
                            resolve();
                        }.bind(this)).fail(function () {
                            reject();
                        }.bind(this));
                    }.bind(this);
                    fileReader.readAsDataURL(file);
        
                }.bind(this));
            });
        }
    });
});