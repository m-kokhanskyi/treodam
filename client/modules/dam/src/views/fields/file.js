Espo.define('dam:views/fields/file', 'views/fields/file', function (Dep) {
    return Dep.extend({
        uploadFile: function (file) {
            let isCanceled = false;
            let hasError   = false;
            let msg        = '';
            
            let rules       = this.getMetadata().get(['app', 'validation', this.name]);
            let maxFileSize = 0;
            
            if (rules && rules.size) {
                maxFileSize = rules.size;
            }
    
            if (!maxFileSize) {
                maxFileSize = this.params.maxFileSize || 0;
                let appMaxUploadSize = this.getHelper().getAppParam('maxUploadSize') || 0;
                if (!maxFileSize || maxFileSize > appMaxUploadSize) {
                    maxFileSize = appMaxUploadSize;
                }
            }
    
            if (maxFileSize && file.size > maxFileSize * 1024 * 1024) {
                hasError = true;
                msg = this.translate('fieldMaxFileSizeError', 'messages')
                    .replace('{field}', this.getLabelText())
                    .replace('{max}', maxFileSize);
            }
            
            if (!hasError && rules && rules.extensions) {
                let fileExtensions = file.name.split('.').pop();
                
                if (rules.extensions.indexOf(fileExtensions) === -1) {
                    hasError = true;
                    msg = this.translate('extensionsError', 'messages')
                        .replace('{list}', rules.extensions.join(', '));
                }
            }
            
            if (hasError) {
                this.showValidationMessage(msg, '.attachment-button label');
                return;
            }
            
            this.isUploading = true;
            
            this.getModelFactory().create('Attachment', function (attachment) {
                var $attachmentBox = this.addAttachmentBox(file.name, file.type);
                
                this.$el.find('.attachment-button').addClass('hidden');
                
                $attachmentBox.find('.remove-attachment').on('click.uploading', function () {
                    isCanceled = true;
                    this.$el.find('.attachment-button').removeClass('hidden');
                    this.isUploading = false;
                }.bind(this));
                
                var fileReader    = new FileReader();
                fileReader.onload = function (e) {
                    this.handleFileUpload(file, e.target.result, function (result, fileParams) {
                        attachment.set('name', fileParams.name);
                        attachment.set('type', fileParams.type || 'text/plain');
                        attachment.set('size', fileParams.size);
                        attachment.set('role', 'Attachment');
                        attachment.set('relatedType', this.model.name);
                        attachment.set('file', result);
                        attachment.set('field', this.name);
                        
                        attachment.save({}, {timeout: 0}).then(function () {
                            this.isUploading = false;
                            if (!isCanceled) {
                                $attachmentBox.trigger('ready');
                                this.setAttachment(attachment);
                            }
                        }.bind(this)).fail(function () {
                            $attachmentBox.remove();
                            this.$el.find('.uploading-message').remove();
                            this.$el.find('.attachment-button').removeClass('hidden');
                            this.isUploading = false;
                        }.bind(this));
                    }.bind(this));
                }.bind(this);
                fileReader.readAsDataURL(file);
            }, this);
        }
    });
});
