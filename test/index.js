var should = require('should');
var PS = require('../index');
describe('#phoneService()',function(){
	it('should be ok',function(done){
		PS.query(15900000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国移动');
			data.abbreviation.should.be.equal('China_Mobile');
			done(err);
		});
	});
	it('should be ok',function(done){
		PS.query("15900000000",function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国移动');
			done(err);
		});
	});
	it('should be ok',function(done){
		PS.query(13000000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国联通');
			done(err);
		});
	});
	it('should be ok',function(done){
		PS.query(18100000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国电信');
			done(err);
		});
	});
	it('should be not ok',function(done){
		PS.query(1810000000,function(err,data){
			err.should.be.equal('phone length  must be eleven, current phone is : 1810000000');
			done();
		});
	});
	it('should be not ok',function(done){
		PS.query('navy',function(err,data){
			err.should.be.equal('phone must be number, current phone is : navy');
			done();
		});
	});
	it('should be not ok',function(done){
		PS.query(11111111111,function(err,data){
			err.should.be.equal('11111111111 is not a phone number.');
			done();
		});
	});
})