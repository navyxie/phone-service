var supplierPrefix = '中国';
var supplierEnglishPrefix = 'China_';
var ChinaMobileAbbreviation = supplierEnglishPrefix+'Mobile';
var ChinaTelecomAbbreviation = supplierEnglishPrefix+'Telecom';
var ChinaUnicomAbbreviation = supplierPrefix+'Unicom';
var util = {
	isPhone:function(abbreviation){
		return !!abbreviation; 
	},
	isChinaMobile:function(abbreviation){
		return abbreviation === ChinaMobileAbbreviation;
	},
	isChinaTelecom:function(abbreviation){
		return abbreviation === ChinaTelecomAbbreviation;
	},
	isChinaUnicom:function(abbreviation){
		return abbreviation === ChinaUnicomAbbreviation;
	},
	getSupplierEnglishName:function(chineseName){
		if(chineseName.indexOf('移动') !== -1){
			return ChinaMobileAbbreviation;
		}
		if(chineseName.indexOf('电信') !== -1){
			return ChinaTelecomAbbreviation;
		}
		if(chineseName.indexOf('联通') !== -1){
			return ChinaUnicomAbbreviation
		}
		return chineseName;
	},
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
		return name;
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
		return parse;
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
			var chineseName = util.getSupplierName(cloneData.supplier);
			cloneData.phone = phone;
			cloneData.abbreviation = util.getSupplierEnglishName(chineseName);		
			cloneData.supplier = chineseName;
		}
		return cloneData;
	},
	getErrorMsg:function(phone){
		return phone + ' is not a phone number.'
	}
};
module.exports = util;