var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'paipai',
	parse:function(data,cb){
		cb(null,eval(data));
	},
	keyMap:{

	},
	url:function(phone){
		return 'http://virtual.paipai.com/extinfo/GetMobileProductInfo?mobile='+phone+'&amount=10000';
	},
	model:2
}
pluginParam['keyMap'][util.getSupplierKey()] = 'isp';
pluginParam['keyMap'][util.getProvinceKey()] = 'province';
pluginParam['keyMap'][util.getCityKey()] = 'cityname';
module.exports = pluginParam;