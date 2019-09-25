Espo.define('dam:views/asset/fields/attributes', 'dam:views/fields/attributes', function (Dep) {
    return Dep.extend({
        setup () {
            Dep.prototype.setup.call(this);
            this.listenTo(this.model, "change:assetType", () => {
                this.reRender();
            });
        },

        getAssetType() {
            return this._transformAssetType(this.model.get("AssetType"));
        }
    })
});