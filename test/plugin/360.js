var should = require('should');
var plugin = require('../../lib/plugin');
var cn360Plugin = require('../../plugin/360');
plugin.add(cn360Plugin);
describe('#360()',function(){
	it('should be ok',function(done){
		plugin.exe('360',15900000000,function(err,data){
			console.log(data);
			done(err);
		});
	})
});