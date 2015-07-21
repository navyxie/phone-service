var errMsgPrefix = 'request tenpay api error : ';
var request = require('../lib/request');
var util = require('../lib/util');
var parseString = require('xml2js').parseString;
module.exports = function (phone,option,cb){
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	request.get('http://life.tenpay.com/cgi-bin/mobile/MobileQueryAttribution.cgi?chgmobile='+phone,option,function(err,data){
		if(err){
			cb(errMsgPrefix+err);
		}else{
			parseString(data,function(err,data){
				cb(err,data);
			})			
		}
	})
}