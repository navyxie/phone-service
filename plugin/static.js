var util = require('../lib/util');
var staticPhoneList = util.getStaticRegExpPhoneList();
var staticPhoneListLen = staticPhoneList.length;
var pluginParam = {
	name:'static',
	parse:function(phone,cb){
		var result = {};
		for(var i = 0 ; i < staticPhoneListLen ; i++){
			var patterns = staticPhoneList[i].patterns;
			for(var j = 0 , jLen = patterns.length ; j < jLen ; j++){
				if(patterns[j].test(phone)){
					result[util.getSupplierKey()] = staticPhoneList[i].supplier;
					return cb(null,result);
				}
			}
		}
		return cb(util.getErrorMsg(phone));
	}
}
module.exports = pluginParam;