var should = require('should');
var plugin = require('../../lib/plugin');
var staticPlugin = require('../../plugin/static');
plugin.add(staticPlugin);
describe('#static()',function(){
	it('should be ok',function(done){
		plugin.exe('static',15900000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国移动');
			data.abbreviation.should.be.equal('China_Mobile');
			done(err);
		})
	});
	it('should be ok',function(done){
		plugin.exe('static',"15900000000",function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国移动');
			done(err);
		});
	});
	it('should be ok',function(done){
		plugin.exe('static',13000000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国联通');
			done(err);
		});
	});
	it('should be ok',function(done){
		plugin.exe('static',18100000000,function(err,data){
			should.not.exist(err);
			data.supplier.should.be.equal('中国电信');
			done(err);
		});
	});
	it('should be not ok',function(done){
		plugin.exe('static',1810000000,function(err,data){
			err.should.be.equal('phone length  must be eleven, current phone is : 1810000000');
			done();
		});
	});
	it('should be not ok',function(done){
		plugin.exe('static','navy',function(err,data){
			err.should.be.equal('phone must be number, current phone is : navy');
			done();
		});
	});
	it('should be not ok',function(done){
		plugin.exe('static',11111111111,function(err,data){
			err.should.be.equal('plugin : static parse error , msg : 11111111111 is not a phone number.');
			done();
		});
	});
})