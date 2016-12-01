var request = require('../lib/request');
var util = require('../lib/util');
var pluginParam = {
	name:'ip138',
	parse:function(data,cb){
		var result = {};
		var resultArr = [];
		var dataArr = [];
		var provinceRegObj = new RegExp(/卡号归属地([\s\S]*?)<\/TR>/gi);
		var supplierRegObj = new RegExp(/卡&nbsp;类&nbsp;型([\s\S]*?)<\/TR>/gi); 
		var match = null;  
		if(match = provinceRegObj.exec(data)){
			resultArr.push(match[1].replace(/\r*\n*\t*\s*/g,'').replace(/<!--/g,'').replace(/-->/g).replace(/<td><\/td>/g,'').replace(/align="center"/g,'').replace(/undefined/g,''));
		}
		if(match = supplierRegObj.exec(data)){
			resultArr.push(match[1].replace(/\r*\n*\t*\s*/g,'').replace(/<!--/g,'').replace(/-->/g).replace(/<td><\/td>/g,'').replace(/align="center"/g,'').replace(/undefined/g,''));
		}
		resultArr.forEach(function(r){
			r = r.substr(0,r.lastIndexOf('<\/'));
			r = r.substr(r.lastIndexOf('>')+1);
			dataArr.push(r);
		});
		if(dataArr[0] && dataArr[1]){
			resultArr = dataArr[0].split('&nbsp;');
			result[util.getSupplierKey()] = dataArr[1];
			result[util.getProvinceKey()] = resultArr[0];
			result[util.getCityKey()] = resultArr[1];
			cb(null,result);
		}else{
			cb('ip138 plugin return data error, data is not a object : '+data);
		}		
	},
	url:function(phone){
		return 'http://www.ip138.com:8080/search.asp?action=mobile&mobile='+phone;
	},
	option: {
		headers: {
			'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
			'Accept-Encoding': 'gzip, deflate, sdch',
			'Accept-Language': 'zh-CN,zh;q=0.8,en;q=0.6,zh-TW;q=0.4',
			'Cache-Control': 'no-cache',
			'Connection': 'keep-alive',
			'Host': 'www.ip138.com:8080',
			'Pragma': 'no-cache',
			'Upgrade-Insecure-Requests': 1,
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.108 Safari/537.36'
		}
	},
	model:2
}
module.exports = pluginParam;