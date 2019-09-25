Espo.define('dam:views/asset_relation/record/modals/create-asset-relation', 'views/modal',
    Dep => Dep.extend({

        cssName: 'edit-modal',

        header: false,

        saveDisabled: false,

        fullFormDisabled: false,

        editView: null,

        columnCount: 2,

        escapeDisabled: true,

        fitHeight: true,

        className: 'dialog dialog-record',

        sideDisabled: false,

        bottomDisabled: false,

        "template": "dam:asset_relation/record/modals/create-relation",

        setup() {

            this.buttonList = [];

            if ('saveDisabled' in this.options) {
                this.saveDisabled = this.options.saveDisabled;
            }

            if (!this.saveDisabled) {
                this.buttonList.push({
                    name: 'save',
                    label: 'Save',
                    style: 'primary',
                });
            }

            this.fullFormDisabled = this.options.fullFormDisabled || this.fullFormDisabled;

            this.layoutName = this.options.layoutName || this.layoutName;

            this.buttonList.push({
                name: 'cancel',
                label: 'Cancel'
            });

            this.header = this.getLanguage().translate('Create Asset Relation' + this.scope, 'labels', this.scope);

            var iconHtml = this.getHelper().getScopeColorIconHtml(this.scope);
            this.header = iconHtml + this.header;

            this.sourceModel = this.model;

        },
    })
);