var request = require('../lib/request');
var util = require('../lib/util');
var parseString = require('xml2js').parseString;
var pluginParam = {
	name:'tenpay',
	parse:function(data,cb){
		var result = {};
		parseString(data,function(err,data){
			if(err){
				cb('tenpay plugin return data error, data is : '+err);
			}else{
				if(util.isObject(data) && util.isObject(data.root)){
					result[util.getSupplierKey()] = data.root.supplier[0];
					result[util.getProvinceKey()] = data.root.province[0];
					result[util.getCityKey()] = data.root.city[0];
					cb(null,result);
				}else{
					cb('tenpay plugin return data error, data is not a object : '+data);
				}
			}
		})
	},
	url:function(phone){
		return 'http://life.tenpay.com/cgi-bin/mobile/MobileQueryAttribution.cgi?chgmobile='+phone;
	},
	model:2
}
module.exports = pluginParam;