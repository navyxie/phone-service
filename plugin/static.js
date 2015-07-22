var util = require('../lib/util');
var staticPhoneList = [
	{
		supplier:"联通",
		patterns:[/^(13[0-2]|145|15[5-6])\d{8}$/,/^170[7-9]\d{7}$/,/^18[5-6]\d{8}$/]
	},
	{
		supplier:"电信",
		patterns:[/^(133|153)\d{8}$/,/^1700\d{7}$/,/^(18[0-1]|189)\d{8}$/]
	},
	{
		supplier:"移动",
		patterns:[/^(13[4-9]|147|15[0-2]|15[7-9])\d{8}$/,/^1705\d{7}$/,/^(18[2-3]|18[7-8])\d{8}$/]
	}
];
var staticPhoneListLen = staticPhoneList.length;
var pluginParam = {
	name:'static',
	parse:function(phone,cb){
		for(var i = 0 ; i < staticPhoneListLen ; i++){
			var patterns = staticPhoneList[i].patterns;
			for(var j = 0 , jLen = patterns.length ; j < jLen ; j++){
				if(patterns[j].test(phone)){
					return cb(null,{supplier:staticPhoneList[i].supplier});
				}
			}
		}
		return cb(util.getErrorMsg(phone));
	},
	keyMap:{

	}
}
pluginParam['keyMap'][util.getSupplierKey()] = 'supplier';
module.exports = pluginParam;