var should = require('should');
var plugin = require('../../lib/plugin');
var taobaoPlugin = require('../../plugin/taobao');
plugin.add(taobaoPlugin);
describe('#taobao()',function(){
	it('should be ok',function(done){
		plugin.exe('taobao',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});