var should = require('should');
var plugin = require('../../lib/plugin');
var ip138Plugin = require('../../plugin/ip138');
describe('#ip138()',function(){
	it('should be ok',function(done){
		plugin.add(ip138Plugin);
		plugin.exe('ip138',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});