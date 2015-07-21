var tenpay = require('../parse/tenpay');
var should = require('should');
describe('#tenpay()',function(){
	it('should be ok',function(done){
		tenpay(15900000000,function(err,data){
			console.log(data);
			console.log(typeof data);
			done(err);
		});
	})
})
