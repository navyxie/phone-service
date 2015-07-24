var async = require('async');
var _ = require('underscore');
var util = require('./util');
var plugin = require('./plugin');
//load plugin,加载模块默认自带插件
plugin.add(util.loadPlugin('360'));
plugin.add(util.loadPlugin('paipai'));
plugin.add(util.loadPlugin('static'));
plugin.add(util.loadPlugin('taobao'));
plugin.add(util.loadPlugin('tenpay'));
plugin.add(util.loadPlugin('baifubao'));
plugin.add(util.loadPlugin('ip138'));
//load plugin end
/**
*option = > {
	parallel:2,//插件通道并发请求数
	timeout:null,//响应超时时间
	model:0,//获取手机号码信息模式,目前支持3种：0->只获取手机号运营商,1->获取手机号运营商以及省份,2->获取手机号运营商、省份以及城市(地级市)
	plugins:[]//指定使用哪些插件通道(当某些通道出问题时，用户可以指定只用这些通道)
}
*号码归属地查询
*/
function phoneService(phone,option,cb){
	var allPlugin = plugin.getAll();//获取所有插件
	var list = [];//当前并发请求的插件名字列表
	var listFn = [];//当前并发请求的插件执行函数列表
	var currentModelPlugin = [];//当前符合的插件名字列表
	var result;//成功请求返回的结果值
	var errMsg = util.getErrorMsg();//default error msg.
	if(util.isFunction(option)){
		cb = option;
		option = {};
	}
	var parallel = (option.parallel && !isNaN(option.parallel)) ? option.parallel : 2;//默认两个并发
	if(option.plugins){
		//如果使用者指定插件，则优先使用。
		if(util.isString(option.plugins)){
			currentModelPlugin.push(option.plugins);
		}else if(util.isArray(option.plugins)){
			currentModelPlugin = option.plugins;
		}else{
			throw new Error('option param plugins must be string or array.');
		}
	}else{
		//系统分配插件	
		var modelSupportPlugin = [];//所有模式支持的插件名字列表
		modelSupportPlugin[0] = allPlugin.key;
		modelSupportPlugin[1] = Object.keys(_.pick(allPlugin.plugin,function(plugin){
			return plugin.model >= 1;
		}));
		modelSupportPlugin[2] = Object.keys(_.pick(allPlugin.plugin,function(plugin){
			return plugin.model >= 2;
		}));
		if(option.model === 1){
			currentModelPlugin = modelSupportPlugin[1];
		}else if(option.model === 2){
			currentModelPlugin = modelSupportPlugin[2];
		}else{
			currentModelPlugin = modelSupportPlugin[0];	
		}	
	}
	parallel = (parallel > currentModelPlugin.length) ? currentModelPlugin.length : parallel;
	if(_.indexOf(currentModelPlugin,'static') !== -1){
		//如果模式为0,默认要有一种方式是使用static插件的
		list.push('static');
		currentModelPlugin = _.without(currentModelPlugin,list[0]);
		parallel--;
	}
	list = list.concat(_.sample(currentModelPlugin,parallel));//按照当前并发请求数拾取相应的插件
	list.forEach(function(pluginName){
		//符合当前并发请求的插件执行函数集合
		listFn.push(function(callback){
			plugin.exe(pluginName,phone,option.timeout,function(err,data){
				errMsg = err;
				if(!err){
					result = data;
					return callback(data);
				}
				return callback(null);
			});
		})
	});
	//并发请求,只要有一个成功返回即终止
	async.parallel(listFn,function(err,results){
		cb(errMsg,result);
	});
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
	isChinaUnicom:isChinaUnicom,
	plugin:plugin,
	util:util
}