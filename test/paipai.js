var paipai = require('../parse/paipai');
var should = require('should');
describe('#paipai()',function(){
	it('should be ok',function(done){
		paipai(15900000000,function(err,data){
			console.log(data);
			console.log(typeof data);
			done(err);
		});
	})
})
