var supplierPrefix = '中国';
var util = {
	getSupplierName:function(name){
		if(name.indexOf('移动') !== -1){
			return supplierPrefix+'移动';
		}
		if(name.indexOf('电信') !== -1){
			return supplierPrefix+'电信';
		}
		if(name.indexOf('联通') !== -1){
			return supplierPrefix+'联通';
		}
	},
	loadParse:function(parseName){	 
		var parse;
		try{
			parse = require('../parse/'+parseName);
		}catch(e){
			var errMsg = parseName + ' parse lib is not exist, please check folder:parse.';
			console.log(errMsg);
			console.log(e);
			throw new Error(errMsg);
		}
		if(parse){
			return parse;
		}	
	},
	isFunction:function(fn){
		return typeof fn === 'function';
	},
	isObject:function(obj){
		return Object.prototype.toString.call(obj) === '[object Object]';
	},
	isArray:function(arr){
		return Object.prototype.toString.call(arr) === '[object Array]';
	},
	extend:function(destination,source){
		for(var key in source){
			if(source.hasOwnProperty(key) && source[key]){
				destination[key] = source[key];
			}
		}
		return destination;
	},
	clone:function(obj){
		if(!util.isObject(obj)){
			return obj;
		}
		return util.isArray(obj) ? obj.slice() : util.extend({},obj);
	},
	parseReturn:function(phone,data){
		var cloneData = util.clone(data);
		if(util.isObject(cloneData)){
			cloneData.phone = phone;
			cloneData.supplier = util.getSupplierName(cloneData.supplier);
		}
		return cloneData;
	},
	getErrorMsg:function(phone){
		return phone + ' is not a phone number.'
	}
};
module.exports = util;