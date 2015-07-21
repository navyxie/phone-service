# 通过手机号查询运营商以及号码归属地

### 安装:npm install phone-service

## API

[query](#query)


[isPhone](#isPhone)


[isChinaMobile](#isChinaMobile)


[isChinaTelecom](#isChinaTelecom)


[isChinaUnicom](#isChinaUnicom)

<a name="query" />
查询手机号详细信息, 异步函数
```js
var phoneService = require('phone-service');
phoneService.query(15900000000,function(err,data){
	//data=>{supplier:"中国移动",phone:15900000000,abbreviation:'China_Mobile'}
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
