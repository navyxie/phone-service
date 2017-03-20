var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
  name: '360',
  parse: function(data, cb) {
    var scriptIndex = data.indexOf('<script');
    ((scriptIndex !== -1) && (data = data.substr(0, scriptIndex)));
    var resObj;
    var result = {};
    try {
      resObj = JSON.parse(data);
    } catch (e) {
      return cb('360 plugin JSON parse error : ' + data);
    }
    if (resObj.code === 0) {
      result[util.getSupplierKey()] = resObj.data.sp;
      result[util.getProvinceKey()] = resObj.data.province;
      result[util.getCityKey()] = resObj.data.city
      cb(null, result);
    } else {
      cb("360 plugin request error : ", data);
    }
  },
  url: function(phone) {
    return 'http://cx.shouji.360.cn/phonearea.php?number=' + phone;
  },
  model: 2
}
module.exports = pluginParam;