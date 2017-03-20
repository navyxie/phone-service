var util = {
  getSupplierPrefix: function() {
    return '中国';
  },
  getSupplierEnglishPrefix: function() {
    return 'China_';
  },
  getChinaMobileAbbreviation: function() {
    return util.getSupplierEnglishPrefix() + 'Mobile';
  },
  getChinaTelecomAbbreviation: function() {
    return util.getSupplierEnglishPrefix() + 'Telecom';
  },
  getChinaUnicomAbbreviation: function() {
    return util.getSupplierEnglishPrefix() + 'Unicom';
  },
  isChinaMobile: function(abbreviation) {
    return abbreviation === util.getChinaMobileAbbreviation();
  },
  isChinaTelecom: function(abbreviation) {
    return abbreviation === util.getChinaTelecomAbbreviation();
  },
  isChinaUnicom: function(abbreviation) {
    return abbreviation === util.getChinaUnicomAbbreviation();
  },
  getSupplierEnglishName: function(chineseName) {
    if (chineseName.indexOf('移动') !== -1) {
      return util.getChinaMobileAbbreviation();
    }
    if (chineseName.indexOf('电信') !== -1) {
      return util.getChinaTelecomAbbreviation();
    }
    if (chineseName.indexOf('联通') !== -1) {
      return util.getChinaUnicomAbbreviation();
    }
    return chineseName;
  },
  getSupplierName: function(name) {
    if (name.indexOf('移动') !== -1) {
      return util.getSupplierPrefix() + '移动';
    }
    if (name.indexOf('电信') !== -1) {
      return util.getSupplierPrefix() + '电信';
    }
    if (name.indexOf('联通') !== -1) {
      return util.getSupplierPrefix() + '联通';
    }
    return name;
  },
  loadPlugin: function(pluginName) {
    var parse;
    try {
      parse = require('../plugin/' + pluginName);
    } catch (e) {
      var errMsg = pluginName + ' parse lib is not exist, please check folder:parse.';
      console.log(errMsg);
      console.log(e);
      throw new Error(errMsg);
    }
    return parse;
  },
  isFunction: function(fn) {
    return util.isType(fn, 'Function');
  },
  isObject: function(obj) {
    return util.isType(obj, 'Object');
  },
  isArray: function(arr) {
    return util.isType(arr, 'Array');
  },
  isString: function(str) {
    return util.isType(str, 'String');
  },
  isBoolean: function(flag) {
    return util.isType(flag, 'Boolean');
  },
  isType: function(obj, type) {
    return Object.prototype.toString.call(obj) === '[object ' + type + ']';
  },
  isEmpty: function(obj) {
    if (!obj) {
      return true;
    }
    if (util.isArray(obj) && obj.length === 0) {
      return true;
    }
    if (util.isObject(obj) && Object.keys(obj).length === 0) {
      return true;
    }
    return false;
  },
  extend: function(destination, source) {
    for (var key in source) {
      if (source.hasOwnProperty(key) && source[key]) {
        destination[key] = source[key];
      }
    }
    return destination;
  },
  clone: function(obj) {
    if (!util.isObject(obj)) {
      return obj;
    }
    return util.isArray(obj) ? obj.slice() : util.extend({}, obj);
  },
  //对最终结果集进行格式化处理
  parseReturn: function(phone, data) {
    if (util.isEmpty(data) || !util.isObject(data)) {
      return data;
    }
    if (!data.supplier) {
      return data;
    }
    var cloneData = util.clone(data);
    var keys = Object.keys(cloneData);
    var len = keys.length;
    var chineseName = util.getSupplierName(cloneData.supplier);
    cloneData.phone = phone;
    cloneData.abbreviation = util.getSupplierEnglishName(chineseName);
    cloneData.supplier = chineseName;
    //去掉省，统一省份
    (cloneData.provice && (cloneData.provice.length >= 3) && ((cloneData.provice.indexOf('省') !== -1) && (cloneData.provice = cloneData.provice.substr(0, cloneData.provice.indexOf('省')))));
    //去掉市，统一市
    (cloneData.city && (cloneData.city.length >= 3) && ((cloneData.city.indexOf('市') !== -1) && (cloneData.city = cloneData.city.substr(0, cloneData.city.indexOf('市')))));
    //去掉对象值里的空格
    while (len) {
      len--;
      if (cloneData.hasOwnProperty(keys[len])) {
        util.isString(cloneData[keys[len]]) && (cloneData[keys[len]] = cloneData[keys[len]].trim());
      }
    }
    return cloneData;
  },
  getErrorMsg: function(phone) {
    return phone + ' is not a phone number.';
  },
  getSupplierKey: function() {
    return 'supplier';
  },
  getProvinceKey: function() {
    return 'provice';
  },
  getCityKey: function() {
    return 'city';
  },
  getStaticRegExpPhoneList: function() {
    return [{
      supplier: "联通",
      patterns: [/^(13[0-2]|145|15[5-6])\d{8}$/, /^170[7-9]\d{7}$/, /^18[5-6]\d{8}$/]
    }, {
      supplier: "电信",
      patterns: [/^(133|153)\d{8}$/, /^1700\d{7}$/, /^(18[0-1]|189)\d{8}$/, /^177\d{8}$/]
    }, {
      supplier: "移动",
      patterns: [/^(13[4-9]|147|15[0-2]|15[7-9])\d{8}$/, /^1705\d{7}$/, /^(18[2-3]|18[7-8])\d{8}$/]
    }];
  }
};
module.exports = util;