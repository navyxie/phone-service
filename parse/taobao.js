var errMsgPrefix = 'request taobao api error : ';
var request = require('../lib/request');
var util = require('../lib/util');
module.exports = function (phone,option,cb){
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	request.get('http://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel='+phone,option,function(err,data){
		if(err){
			cb(errMsgPrefix+err);
		}else{
			cb(null,eval(data));
		}
	})
}