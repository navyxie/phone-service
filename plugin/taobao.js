var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'taobao',
	parse:function(data,cb){
		var parseData;
		var result = {};
		try{
			parseData = eval(data);
		}catch(e){
			cb('taobao plugin eval error : '+data);
		}
		if(util.isObject(parseData)){
			result[util.getSupplierKey()] = parseData.catName;
			result[util.getProvinceKey()] = parseData.province;
			cb(null,result);
		}else{
			cb('taobao plugin return data error, data is not a object : '+parseData);
		}
	},
	url:function(phone){
		return 'http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+phone;
	},
	model:1
}
module.exports = pluginParam;