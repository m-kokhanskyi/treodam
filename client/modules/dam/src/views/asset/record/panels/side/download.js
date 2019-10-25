Espo.define('dam:views/asset/record/panels/side/download', 'view',
    Dep => {
        return Dep.extend({
            template: "dam:asset/record/panels/side/download",
            data() {
                return {
                    attachmentId: this._getAttachmentId()
                };
            },
            _getAttachmentId() {
                return this.model.get("fileId") || this.model.get("imageId");
            }
        });
    }
);