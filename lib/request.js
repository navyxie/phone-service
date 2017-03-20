var util = require('./util');
var request = require('request');
var iconv = require('iconv-lite');

function query(url, option, cb) {
  var cloneOption = util.clone(option);
  cloneOption.url = url;
  cloneOption.encoding = typeof cloneOption.encoding !== 'undefined' ? cloneOption.encoding : null;
  cloneOption.decoding = typeof cloneOption.decoding !== 'undefined' ? cloneOption.decoding : 'gb2312';
  cloneOption.method = typeof cloneOption.method !== 'undefined' ? cloneOption.method : 'get';
  request(cloneOption, function(err, response, body) {
    cb(err, body && iconv.decode(body, cloneOption.decoding));
  });
}
module.exports = {
  request: query
}