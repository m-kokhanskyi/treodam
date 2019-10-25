Espo.define('dam:views/fields/name-of-file', 'views/fields/varchar',
    Dep => Dep.extend({
        detailTemplate: "dam:fields/name-of-file/detail",
        data() {
            return _.extend({
                attachmentId: this._getAttachmentId()
            }, Dep.prototype.data.call(this));
        },
        _getAttachmentId() {
           return this.model.get("fileId") || this.model.get("imageId")
        }
    })
);