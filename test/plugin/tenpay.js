var should = require('should');
var plugin = require('../../lib/plugin');
var tenpayPlugin = require('../../plugin/tenpay');
describe('#tenpay()',function(){
	it('should be ok',function(done){
		plugin.add(tenpayPlugin);
		plugin.exe('tenpay',15900000000,function(err,data){
			if(err){
				console.log('tenpay plugin error:',err);
			}			
			done();
		});
	})
});