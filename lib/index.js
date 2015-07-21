var util = require('./util');
function phoneService(phone,option,cb){
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	if(isNaN(phone)){
		return cb('phone must be number, current phone is : '+phone);
	}
	if(phone.toString().length !== 11){
		return cb('phone length  must be eleven, current phone is : '+phone);
	}
	phone = parseInt(phone,10);
	var staticParse = util.loadParse('static');
	staticParse(phone,option,function(err,data){
		cb(err,util.parseReturn(phone,data));
	})
}
module.exports = {
	query:phoneService
}