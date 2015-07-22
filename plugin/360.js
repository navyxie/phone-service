var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'360',
	parse:function(data,cb){
		var scriptIndex = data.indexOf('<script');
		((scriptIndex !== -1) && (data = data.substr(0,scriptIndex)));
		var resObj;
		try{
			resObj = JSON.parse(data);
		}catch(e){
			cb('JSON parse error : '+data);
		}
		if(resObj.code === 0){
			cb(null,resObj.data);
		}else{
			cb("360 plugin request error : ",data);
		}
		
	},
	keyMap:{

	},
	url:function(phone){
		return 'http://cx.shouji.360.cn/phonearea.php?number='+phone;
	},
	model:2
}
pluginParam['keyMap'][util.getSupplierKey()] = 'sp';
pluginParam['keyMap'][util.getProvinceKey()] = 'province';
pluginParam['keyMap'][util.getCityKey()] = 'city';
module.exports = pluginParam;