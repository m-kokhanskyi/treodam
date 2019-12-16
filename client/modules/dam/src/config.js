/*
 * Dam
 * Free Extension
 * Copyright (c) TreoLabs GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

Espo.define("dam:config", "view", (Dep) => {
    
    let Config = function () {
    };
    
    _.extend(Config.prototype, {
        data : null,
        url  : "DamConfig",
        cache: null,
        
        init() {
            let obj = new Config();
            
            if (obj.loadFromCache(this._helper.cache)) {
                return obj;
            }
            
            obj.fetch();
            return obj;
        },
        
        loadFromCache(cache) {
            this.cache = cache;
            
            if (this.cache) {
                var cached = this.cache.get('app', 'damconfig');
                if (cached) {
                    this.data = cached;
                    return true;
                }
            }
            return null;
        },
        
        fetch() {
            $.ajax({
                url     : this.url,
                type    : 'GET',
                dataType: 'JSON',
                async   : false,
                success : (data) => {
                    this.data = data;
                    this.storeToCache();
                }
            });
        },
        
        storeToCache() {
            if (this.cache) {
                this.cache.set('app', 'damconfig', this.data);
            }
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
                
                if (!(
                    key in pointer
                )) {
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
        
    }, Dep, Backbone.Events);
    
    return Config;
});