var util = require('./util');
/**
*号码归属地查询
*/
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
//是否为手机号
function isPhone(phone){
	var flag;
	phoneService(phone,function(err,data){
		flag = err ? false : true;
	})
	return flag;
}
//是否中国移动手机号
function isChinaMobile(phone){
	var flag;
	phoneService(phone,function(err,data){
		flag = err ? false : util.isChinaMobile(data.abbreviation);
	});
	return flag;
}
//是否中国电信手机号
function isChinaTelecom(phone){
	var flag;
	phoneService(phone,function(err,data){
		flag = err ? false : util.isChinaTelecom(data.abbreviation);
	});
	return flag;
}
//是否中国联通手机号
function isChinaUnicom(phone){
	var flag;
	phoneService(phone,function(err,data){
		flag =  err ? false : util.isChinaUnicom(data.abbreviation);
	});
	return flag;
}
module.exports = {
	query:phoneService,
	isPhone:isPhone,
	isChinaMobile:isChinaMobile,
	isChinaTelecom:isChinaTelecom,
	isChinaUnicom:isChinaUnicom
}