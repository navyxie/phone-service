var should = require('should');
var plugin = require('../../lib/plugin');
var paipaiPlugin = require('../../plugin/paipai');
plugin.add(paipaiPlugin);
describe('#paipai()',function(){
	it('should be ok',function(done){
		plugin.exe('paipai',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});