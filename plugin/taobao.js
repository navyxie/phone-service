var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'taobao',
	parse:function(data,cb){
		cb(null,eval(data))
	},
	keyMap:{

	},
	url:function(phone){
		return 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+phone;
	},
	model:1
}
pluginParam['keyMap'][util.getSupplierKey()] = 'catName';
pluginParam['keyMap'][util.getProvinceKey()] = 'province';
module.exports = pluginParam;