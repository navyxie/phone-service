# 通过手机号查询运营商以及号码归属地

[![Build Status via Travis CI](https://travis-ci.org/navyxie/phone-service.svg?branch=master)](https://travis-ci.org/navyxie/phone-service)


在很多行业很多项目，比如电商，比如金融，比如O2O等，在用户注册这一块会经常用到手机号。如何判断一个手机号是否存在？在特殊产品需求条件下，我们需要区分用户的运营商（移动、联通、电信），甚至区分用户省份，乃至城市，来方便产品，运营同学对用户进行地区化，个性化服务。为了解决这样的业务、产品需求，就动手写了这个模块。

### 安装:npm install phone-service

## [API](#API)

[query](#query)


[isPhone](#isPhone)


[isChinaMobile](#isChinaMobile)


[isChinaTelecom](#isChinaTelecom)


[isChinaUnicom](#isChinaUnicom)


## [插件编写](#plugin)

[add](#add)

[check](#check)

[delete](#delete)


## 工具函数

[util](#util)


<a name="API" />
## API使用例子

<a name="query" />
查询手机号详细信息, 异步函数

可选参数option说明

```js
/**
*option = > {
	parallel:2,//插件通道并发请求数,默认是2,当为0时使用最大(所有可用插件)并发数同时发起查询请求。
	timeout:null,//响应超时时间
	model:0,//获取手机号码信息模式,目前支持3种：0->只获取手机号运营商,1->获取手机号运营商以及省份,2->获取手机号运营商、省份以及城市(地级市)
	plugins:[]//指定使用哪些插件通道(当某些通道出问题时，用户可以指定只用这些通道)
}
*/
```

查询手机号运营商

```js
var phoneService = require('phone-service');
var option = {};
phoneService.query(15900000000,option,function(err,data){
	//data=>{supplier:"中国移动",phone:15900000000,abbreviation:'China_Mobile'}
});
```

查询手机号运营商以及省份

```js
var phoneService = require('phone-service');
var option = {model:1};
phoneService.query(15900000000,option,function(err,data){
	//data=>{supplier:"中国移动",provice:'广东',phone:15900000000,abbreviation:'China_Mobile'}
});
```
查询手机号运营商、省份以及城市(地级市)

```js
var phoneService = require('phone-service');
var option = {model:2};
phoneService.query(15900000000,option,function(err,data){
	//data=>{supplier:"中国移动",provice:'广东',city:'中山',phone:15900000000,abbreviation:'China_Mobile'}
});
```

<a name="isPhone" />
判断是否为合法手机号,同步函数
```js
var phoneService = require('phone-service');
phoneService.isPhone(15900000000) === true
```

<a name="isChinaMobile" />
判断是否为中国移动手机号,同步函数
```js
var phoneService = require('phone-service');
phoneService.isChinaMobile(15900000000) === true
```

<a name="isChinaTelecom" />
判断是否为中国电信手机号,同步函数
```js
var phoneService = require('phone-service');
phoneService.isChinaTelecom(15900000000) === false;
```

<a name="isChinaUnicom" />
判断是否为中国联通手机号,同步函数
```js
var phoneService = require('phone-service');
phoneService.isChinaUnicom(15900000000) === false;
```

<a name="plugin" />
## 插件编写(高级功能)

### 插件扩展开发

如果模块自带的插件不满足或者被插件对应的平台屏蔽了，使用者可以自己开发插件来完成工作。

<a name="add" />
增加插件

```js
//插件开发 demo
var phoneService = require('phone-service');
var util = phoneService.util;
var plugin = phoneService.plugin;//插件对象
var pluginMock = {
	name:'navy',//插件名字
	parse:function(phone,cb){
		//数据解析，返回json.当所编写的插件:
		//1.只返回手机号服务商(即插件的model定义为0)时，返回的对象中必须包含key:util.getSupplierKey()
		//2.返回手机号服务商和归属省份(即插件的model定义为1)时,返回的对象中必须包含key:util.getSupplierKey(),util.getProvinceKey()
		//3.返回手机号服务商和归属省份以及归属城市(即插件的model定义为2)时,返回的对象中必须包含key:util.getSupplierKey(),util.getProvinceKey(),util.getCityKey()
		var result = {};
		result[util.getSupplierKey()] = '移动';
		result[util.getProvinceKey()] = '广东';
		result[util.getCityKey()] = '广州';
		cb(null,result);
	}
	model:2,//model可取值:0,1,2，说明请看上面parse函数
	url:function(phone){
		return 'http://xxxx.com?phone='+phone;//返回请求的url
	},
	option:{
		//node request module request method param.
		headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36"},
		encoding:null
	}
};
plugin.add(pluginMock);//注册插件
```

<a name="check" />
检查插件编写是否正确

```js
plugin.check('navy',function(err,data){
	if(!err){
		//plugin is ok;
	}
})
//使用刚才注册的插件
phoneService.query(15900000000,{plugins:['navy']},function(err,data){
	//todo
})
```

<a name="delete" />
卸载模块自带的插件
当模块自带的插件或者使用者自己开发的插件出问题时（比如被插件对应的平台屏蔽），这时候在调用api前可以卸载有问题的模块

```js
plugin.delete('navy');//卸载自己写的插件
plugin.delete('360');//卸载模块自带的插件
//调用query方式时将不再使用360插件了
phoneService.query(15900000000,function(err,data){
	//todo
})
```

### 工具对象

<a name="util" />
```js
var phoneService = require('phone-service');
phoneService.util.getSupplierKey();//获取服务商返回的key
phoneService.util.getProvinceKey();//获取省份返回的key
phoneService.util.getCityKey();//获取城市（地级市）返回的key
```

## test
```js
//test
npm test
//code coverage
//npm run cov
```

## code coverage

```html
=============================== Coverage summary ===============================
Statements   : 87.41% ( 354/405 )
Branches     : 80.83% ( 156/193 )
Functions    : 95.95% ( 71/74 )
Lines        : 87.41% ( 354/405 )
================================================================================
```

**发布logs**
- 3.0.1 添加parallel参数为0时开启最大（当前支持插件）并发数同时发起查询请求
- 3.0.0 修复重大的bug,plugin下try catch 没有return。建议立马升级至3.0.0。
