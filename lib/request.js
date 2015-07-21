var util = require('./util');
var request = require('request');
var iconv = require('iconv-lite');
function get(url,option,cb){
	var cloneOption = util.clone(option);
	cloneOption.url = url;
	cloneOption.encoding = typeof cloneOption.encoding !== 'undefined' ? cloneOption.encoding : null;
	cloneOption.decoding = typeof cloneOption.decoding !== 'undefined' ? cloneOption.decoding : 'gb2312';
	request.get(cloneOption,function(err, response, body){
		cb(err,body && iconv.decode(body, cloneOption.decoding));
	})
}
module.exports = {
	get:get
}