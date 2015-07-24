var should = require('should');
var plugin = require('../../lib/plugin');
var baifubaoPlugin = require('../../plugin/baifubao');
describe('#baifubao()',function(){
	it('should be ok',function(done){
		plugin.add(baifubaoPlugin);
		plugin.exe('baifubao',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});