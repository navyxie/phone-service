# 通过手机号查询运营商以及号码归属地
## use case
```js
var phoneService = require('phone-service');
phoneService.query(15900000000,function(err,data){
	//data=>{supplier:"中国移动",phone:15900000000,abbreviation:'China_Mobile'}
});
```