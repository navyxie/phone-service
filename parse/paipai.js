var errMsgPrefix = 'request paipai api error : ';
var request = require('../lib/request');
var util = require('../lib/util');
function getPhoneNumInfoExtCallback(obj){
	return obj;
}
module.exports = function (phone,option,cb){
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	request.get('http://virtual.paipai.com/extinfo/GetMobileProductInfo?mobile='+phone+'&amount=10000&callname=getPhoneNumInfoExtCallback',option,function(err,data){
		if(err){
			cb(errMsgPrefix+err);
		}else{
			cb(null,eval(data));
		}
	})
}