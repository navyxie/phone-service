var taobao = require('../parse/taobao');
var should = require('should');
describe('#taobao()',function(){
	it('should be ok',function(done){
		taobao(15900000000,function(err,data){
			console.log(data);
			console.log(typeof data);
			done(err);
		});
	})
})
