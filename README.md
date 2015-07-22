# 通过手机号查询运营商以及号码归属地

### 安装:npm install phone-service

## API

[query](#query)


[isPhone](#isPhone)


[isChinaMobile](#isChinaMobile)


[isChinaTelecom](#isChinaTelecom)


[isChinaUnicom](#isChinaUnicom)


[plugin](#plugin)


[util](#util)

## API使用例子

<a name="query" />
查询手机号详细信息, 异步函数

可选参数option说明

```js
/**
*option = > {
	parallel:2,//插件通道并发请求数,默认是2
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
var option = {model:3};
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

## 高级功能

### 插件扩展开发

如果模块自带的插件不满足或者被插件对应的平台屏蔽了，使用者可以自己开发插件来完成工作。

<a name="plugin" />
插件对象,插件扩展开发
```js
//插件开发 demo
var phoneService = require('phone-service');
var util = phoneService.util;
var plugin = phoneService.plugin;//插件对象
var pluginMock = {
	name:'navy',//插件名字
	parse:function(phone,cb){
		//数据解析，返回json
		cb(null,{supplier:"移动"});
	},
	keyMap:{}//手机运营商，省份以及城市的key与自身parse函数返回的结果匹配，统一最终返回数据对象的key.
	model:1,
	url:function(phone){
		return 'http://xxxx.com?phone='+phone;
	},
	option:{
		//node request module request method param.
		headers:{"User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/41.0.2272.76 Chrome/41.0.2272.76 Safari/537.36"},
		encoding:null
	}
};
pluginMock['keyMap'][util.getSupplierKey()] = 'supplier';
plugin.add(pluginMock);//注册插件
//使用刚才注册的插件
phoneService.query(15900000000,{plugins:['navy']},function(err,data){
	//todo
})
```

### 卸载模块自带的插件

当模块自带的模块出问题时（比如被插件对应的平台屏蔽），这时候在调用api前可以卸载有问题的模块

```js
var phoneService = require('phone-service');
var plugin = phoneService.plugin;//插件对象
plugin.delete('360');
//调用query方式时将不再使用360插件了
phoneService.query(15900000000,function(err,data){
	//todo
})
```

<a name="util" />
工具对象,插件扩展开发
```js
var phoneService = require('phone-service');
phoneService.util.getSupplierKey();//获取服务商返回的key
phoneService.util.getSupplierKey();//获取省份返回的key
phoneService.util.getSupplierKey();//获取城市（地级市）返回的key
```
