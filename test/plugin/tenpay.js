var should = require('should');
var plugin = require('../../lib/plugin');
var tenpayPlugin = require('../../plugin/tenpay');
plugin.add(tenpayPlugin);
describe('#tenpay()',function(){
	it('should be ok',function(done){
		plugin.exe('tenpay',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});