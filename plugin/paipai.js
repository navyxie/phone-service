var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
  name: 'paipai',
  parse: function(data, cb) {
    var parseData;
    var result = {};
    try {
      parseData = eval(data);
    } catch (e) {
      return cb('paipai plugin eval error : ' + data);
    }
    if (util.isObject(parseData)) {
      result[util.getSupplierKey()] = parseData.isp;
      result[util.getProvinceKey()] = parseData.province;
      result[util.getCityKey()] = parseData.cityname;
      cb(null, result);
    } else {
      cb('paipai plugin return data error, data is not a object : ' + parseData);
    }
  },
  url: function(phone) {
    return 'http://virtual.paipai.com/extinfo/GetMobileProductInfo?mobile=' + phone + '&amount=10000';
  },
  model: 2
}
module.exports = pluginParam;