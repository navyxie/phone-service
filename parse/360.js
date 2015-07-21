var errMsgPrefix = 'request 360 api error : ';
var request = require('../lib/request');
var util = require('../lib/util');
module.exports = function (phone,option,cb){
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	request.get('http://cx.shouji.360.cn/phonearea.php?number='+phone,option,function(err,data){
		if(err){
			cb(errMsgPrefix+err);
		}else{
			var scriptIndex = data.indexOf('<script');
			((scriptIndex !== -1) && (data = data.substr(0,scriptIndex)));
			var resObj;
			try{
				resObj = JSON.parse(data);
			}catch(e){
				cb('JSON parse error : '+data);
			}
			cb(null,resObj);
		}
	})
}