var util = require('./util');
var request = require('./request');
var needParam = [{param:'name',type:'String'},{param:'parse',type:'Function'},{param:"keyMap",type:"Object"}];
var needParamLen = needParam.length;
function checkKey(key,keyMap,plugin){
	if(!keyMap.hasOwnProperty(key) || !keyMap[key]){
		throw new Error('plugin ' + plugin.name + ' param keyMap must hasOwnProperty : ' + key + ', and the value must exist.');
	}
}
function hanlderKeyMap(phone,data,plugin,cb){
	if(!util.isObject(data)){
		throw new Error('plugin : ' + plugin.name + ' parse data must be Object.');
	}
	var result = {};
	var phoneInvalidMsg = 'this phone is invalid.';
	var keyMap = plugin.keyMap;
	var supplierKey = util.getSupplierKey();
	var provinceKey = util.getProvinceKey();
	var cityKey = util.getCityKey();
	var supplier = data[keyMap[supplierKey]];
	var province = data[keyMap[provinceKey]];
	var city = data[keyMap[cityKey]];
	checkKey(supplierKey,keyMap,plugin);
	if(plugin.model === 0){
		if(supplier){
			result[supplierKey] = supplier;
			phoneInvalidMsg = null;
		}
	}else if(plugin.model === 1){
		checkKey(provinceKey,keyMap,plugin);
		if(supplier && province){
			result[supplierKey] = supplier;
			result[provinceKey] = province;
			phoneInvalidMsg = null;
		}
	}else if(plugin.model === 2){
		checkKey(cityKey,keyMap,plugin);
		if(supplier && province && city){
			result[supplierKey] = supplier;
			result[provinceKey] = province;
			result[cityKey] = city;
			phoneInvalidMsg = null;
		}
	}		
	cb(phoneInvalidMsg,(result && util.parseReturn(phone,result)));
}
function Plugins(){
	//单例模式,全局共享plugins
	if(Plugins.instance){
		return Plugins.instance;
	}else{
		this.plugins = {};
		return (Plugins.instance = this);
	}
}
Plugins.prototype.add = function(plugins,cover){
	var self = this;
	if(util.isObject(plugins)){
		self._addOne(plugins,cover);
	}
	if(util.isArray(plugins)){
		plugins.forEach(function(plugin){
			self._addOne(plugin,cover);
		});
	}
	return this;
}
Plugins.prototype.delete = function(pluginName){
	delete this.plugins[pluginName];
	return this;
}
Plugins.prototype.exe = function(pluginName,phone,timeout,cb){
	if(util.isFunction(timeout)){
		cb = timeout;
		timeout = null;
	}
	if(isNaN(phone)){
		return cb('phone must be number, current phone is : '+phone);
	}
	if(phone.toString().length !== 11){
		return cb('phone length  must be eleven, current phone is : '+phone);
	}
	phone = parseInt(phone,10);	
	var plugin = this.get(pluginName);
	if(util.isObject(plugin)){
		if(plugin.url){
			//async
			if(util.isFunction(plugin.url)){
				var url = plugin.url(phone);
				if(!url){
					return cb('plugin : ' + pluginName + 'must be return url string.');
				}
				if(timeout && !isNaN(timeout)){
					plugin.option.timeout = timeout;
				}
				request.request(url,plugin.option,function(err,data){
					//todo parse data;
					if(err){
						return cb(err);
					}
					plugin.parse.call(plugin,data,hanlder);
				});
			}else{
				throw new Error('plugin : ' + pluginName + ', url param must be function.');
			}
		}else{
			//sync
			plugin.parse.call(plugin,phone,hanlder);	
		}
	}else{
		cb('plugin : ' + pluginName + ' , do not exist, please add it and then use it.');
	}
	function hanlder(err,data){
		if(err){
			cb('plugin : ' + pluginName + ' parse error , msg : ' +err);
		}else{
			hanlderKeyMap(phone,data,plugin,cb);
		}
	}
}
Plugins.prototype.get = function(pluginName){
	return this.plugins[pluginName];
}
Plugins.prototype.getAll = function(){
	return {key:Object.keys(this.plugins),plugin:this.plugins};
}
Plugins.prototype.reset = function(){
	this.plugins = {};
	return this;
}
Plugins.prototype._addOne = function(plugin,cover){
	if(this._check(plugin)){
		if(this.plugins[plugin.name]){
			if(!cover){
				console.warn('plugin : ' + plugin.name + ' exist, will skip it; if you warn to cover, please pass second param true.');
				return this;			
			}			
		}
		if(plugin.option && !util.isObject(plugin.option)){
			throw new Error('plugin : ' + plugin.name + ' param option must be Object.');
		}
		plugin.model = plugin.model || 0;
		plugin.option = plugin.option || {};
		this.plugins[plugin.name] = plugin;
	}else{
		throw new Error('plugin param invalid : ' + JSON.stringify(needParam) + ', current plugin : ' + JSON.stringify(plugin));
	}
}
Plugins.prototype._check = function(plugin){
	if(!util.isObject(plugin)){
		return false;
	}
	for(var i = 0 ; i < needParamLen ; i++){
		var tem = needParam[i];
		if(!plugin.hasOwnProperty(tem.param) || !util.isType(plugin[tem.param],tem.type)){
			return false;
		}
	}
	return true;
}
module.exports = new Plugins();