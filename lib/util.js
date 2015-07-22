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
	loadPlugin:function(pluginName){	 
		var parse;
		try{
			parse = require('../plugin/'+pluginName);
		}catch(e){
			var errMsg = pluginName + ' parse lib is not exist, please check folder:parse.';
			console.log(errMsg);
			console.log(e);
			throw new Error(errMsg);
		}
		return parse;
	},
	isFunction:function(fn){
		return util.isType(fn,'Function');
	},
	isObject:function(obj){
		return util.isType(obj,'Object');
	},
	isArray:function(arr){
		return util.isType(arr,'Array');
	},
	isString:function(str){
		return util.isType(str,'String');
	},
	isType:function(obj,type){
		return Object.prototype.toString.call(obj) === '[object '+type+']';
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
	//对最终结果集进行格式化处理
	parseReturn:function(phone,data){
		var cloneData = util.clone(data);
		if(util.isObject(cloneData)){
			var chineseName = util.getSupplierName(cloneData.supplier);
			cloneData.phone = phone;
			cloneData.abbreviation = util.getSupplierEnglishName(chineseName);		
			cloneData.supplier = chineseName;
		}
		var keys = Object.keys(cloneData);
		var len = keys.length;
		//去掉对象值里的空格
		while(len){
			len--;
			if(cloneData.hasOwnProperty(keys[len])){
				util.isString(cloneData[keys[len]]) && (cloneData[keys[len]] = cloneData[keys[len]].trim());
			}
		}
		return cloneData;
	},
	getErrorMsg:function(phone){
		return phone + ' is not a phone number.'
	},
	getTimeoutSecond:function(){
		return 10000;
	},
	getSupplierKey:function(){
		return 'supplier';
	},
	getProvinceKey:function(){
		return 'provice';
	},
	getCityKey:function(){
		return 'city';
	}
};
module.exports = util;