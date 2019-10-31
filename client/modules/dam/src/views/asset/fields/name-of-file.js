Espo.define('dam:views/asset/fields/name-of-file', 'dam:views/asset/fields/name',
    Dep => Dep.extend({
        updateName() {
            this.model.set("nameOfFile", this._getFileName());
        }
    })
);