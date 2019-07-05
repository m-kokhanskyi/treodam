Espo.define('dam:views/fields/image', 'dam:views/fields/file', function (Dep) {
    return Dep.extend({
        
        type: 'image',
        
        showPreview: true,
        
        accept: ['image/*'],
        
        defaultType: 'image/jpeg',
        
        previewSize: 'small'
        
    });
});
