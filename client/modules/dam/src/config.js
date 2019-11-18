Espo.define("dam:config", [], () => {
    
    let Config = function () {};
    
    _.extend(Config.prototype, {
        data: null,
        url : "DamConfig",
        
        init() {
            let obj = new Config();
            obj.fetch();
            
            return obj;
        },
        
        fetch() {
            $.ajax({
                url     : this.url,
                type    : 'GET',
                dataType: 'JSON',
                async   : false,
                success : (data) => {
                    this.data = data;
                }
            });
        },
        
        get(path, defaultValue) {
            defaultValue = defaultValue || null;
            var arr;
            if (Array && Array.isArray && Array.isArray(path)) {
                arr = path;
            } else {
                arr = path.split('.');
            }
            
            var pointer = this.data;
            var result  = defaultValue;
            
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i];
                
                if (!(key in pointer)) {
                    result = defaultValue;
                    break;
                }
                if (arr.length - 1 == i) {
                    result = pointer[key];
                }
                pointer = pointer[key];
            }
            
            return result;
        },
        
        getByType(path) {
            let arr;
            if (Array && Array.isArray && Array.isArray(path)) {
                arr = path;
            } else {
                arr = path.split('.');
            }
            if (!this.data.type.custom[arr[0]]) {
                return this.data.type.default;
            }
            path = arr.join('.');
            
            return this.get(`type.custom.${path}`);
        },
        
        getType(name) {
            return name.replace(" ", "-").toLowerCase();
        }
        
    }, Backbone.Events);
    
    return Config;
});