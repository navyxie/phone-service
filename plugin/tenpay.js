var request = require('../lib/request');
var util = require('../lib/util');
var parseString = require('xml2js').parseString;
var pluginParam = {
	name:'tenpay',
	parse:function(data,cb){
		parseString(data,function(err,data){
			cb(err,{supplier:data.root.supplier[0],province:data.root.province[0],city:data.root.city[0]});
		})
	},
	keyMap:{

	},
	url:function(phone){
		return 'http://life.tenpay.com/cgi-bin/mobile/MobileQueryAttribution.cgi?chgmobile='+phone;
	},
	model:2
}
pluginParam['keyMap'][util.getSupplierKey()] = 'supplier';
pluginParam['keyMap'][util.getProvinceKey()] = 'province';
pluginParam['keyMap'][util.getCityKey()] = 'city';
module.exports = pluginParam;