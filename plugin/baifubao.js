var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'baifubao',
	parse:function(data,cb){
		var parseData;
		var result = {};
		var staticStr = '/*fgg_again*/baifubaophone';
		var len = staticStr.length;
		data = data.substr('/*fgg_again*/baifubaophone'.length);
		try{
			parseData = eval(data);
		}catch(e){
			cb('baifubao plugin eval error : '+data);
		}
		if(util.isObject(parseData) && util.isObject(parseData.data)){
			result[util.getSupplierKey()] = parseData.data.operator;
			result[util.getProvinceKey()] = parseData.data.area;
			cb(null,result);
		}else{
			cb('baifubao plugin return data error, data is not a object : '+parseData);
		}
	},
	url:function(phone){
		return 'https://www.baifubao.com/callback?cmd=1059&callback=baifubaophone&phone='+phone;
	},
	model:1
}
module.exports = pluginParam;