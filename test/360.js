var shouji360 = require('../parse/360');
var should = require('should');
describe('#shouji360()',function(){
	it('should be ok',function(done){
		shouji360(15900000000,function(err,data){
			console.log(data);
			console.log(typeof data);
			done(err);
		});
	})
})
