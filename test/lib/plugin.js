var should = require('should');
var muk = require('muk');
var plugin = require('../../lib/plugin');
var util = require('../../lib/util');
var request = require('../../lib/request');
describe('#plugin()',function(){
	it('#getAll()',function(){
		plugin.reset();
		plugin.add(util.loadPlugin('360'));
		plugin.add(util.loadPlugin('paipai'));
		plugin.add(util.loadPlugin('taobao'));
		plugin.getAll().key.length.should.be.equal(3);
	});
	it('#delete()',function(){
		plugin.delete('360');
		plugin.getAll().key.length.should.be.equal(2);
	});
	describe('get',function(){
		before(function(){
			plugin.add(util.loadPlugin('360'));
		});
		it('#get()',function(){
			plugin.get('360').name.should.be.equal('360');
		});
		after(function(){
			plugin.delete('360');
		});
	});
	describe('add',function(){
		it('#add() array',function(){
			var pluginMock = {
				name:'navy',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add([pluginMock]);
			plugin.get('navy').should.have.properties(['name','parse']);
		});
		it('#add()',function(){
			plugin.add(util.loadPlugin('360'));
			plugin.getAll().key.length.should.be.equal(2);
			plugin.add(util.loadPlugin('360'));
			plugin.getAll().key.length.should.be.equal(2);
		});
		it('#add() invalid',function(){
			try{
				plugin.add({name:'invalid',parse:function(){},option:[]});
			}catch(e){
				plugin.getAll().key.length.should.be.equal(2);
			}			
		});
		it('#add() cover',function(){
			var pluginMock = {
				name:'navy',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add(pluginMock,true);
			plugin.get('navy').should.have.properties({name:'navy'});
		});
		after(function(){
			plugin.delete('navy').delete('navy2');
		})
	});
	it('#_addOne() invalid',function(){
		try{
			plugin._addOne([]);
		}catch(e){
			e.message.should.be.equal('plugin param invalid : [{"param":"name","type":"String"},{"param":"parse","type":"Function"}], current plugin : []');
		}	
	});
	describe('_check',function(){
		it('#_check() cover',function(){
			var pluginMock = {
				name:'navy',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin._check(pluginMock).should.be.equal(true);
		});
		it('#_check() invalid',function(){
			plugin._check("").should.be.equal(false);
		});
	});
	it('#reset() cover',function(){
		plugin.reset();
		plugin.getAll().key.length.should.be.equal(0);
	});
	describe('exe',function(){
		it('#exe() ok model:0',function(){
			var pluginMock = {
				name:'navyexe',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add(pluginMock);
			plugin.exe('navyexe',15900000000,function(err,data){
				data.phone.should.be.equal(15900000000);
				data.supplier.should.be.equal("中国移动");
			});
		});
		it('#exe() ok model:1',function(){
			var pluginMock = {
				name:'navyexe',
				parse:function(phone,cb){
					cb(null,{supplier:"移动",provice:"广东"});
				},
				model:1
			};
			plugin.add(pluginMock);
			plugin.exe('navyexe',15900000000,function(err,data){
				data.phone.should.be.equal(15900000000);
				data.supplier.should.be.equal("中国移动");
			});
		});
		it('#exe() ok model:2',function(){
			var pluginMock = {
				name:'navyexe',
				parse:function(phone,cb){
					cb(null,{supplier:"移动",provice:"广东",city:"广州"});
				},
				model:2
			};
			plugin.add(pluginMock);
			plugin.exe('navyexe',15900000000,function(err,data){
				data.phone.should.be.equal(15900000000);
				data.supplier.should.be.equal("中国移动");
			});
		});
		it('#exe() hanlderKeyMap model:0',function(){
			var pluginMock = {
				name:'navymodel0',
				parse:function(phone,cb){
					cb(null,{test:"移动"});
				}
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel0',15900000000,function(err,data){
				err.should.be.equal('plugin navymodel0 parse function must return Object ,and the Object hasOwnProperty : supplier, and the value must exist.');
			});
		});
		it('#exe() hanlderKeyMap model:1',function(){
			var pluginMock = {
				name:'navymodel1',
				parse:function(phone,cb){
					cb(null,{test:"移动"});
				},
				model:1
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel1',15900000000,function(err,data){
				err.should.be.equal('plugin navymodel1 parse function must return Object ,and the Object hasOwnProperty : supplier and provice, and the value must exist.');
			});
		});
		it('#exe() hanlderKeyMap model:2',function(){
			var pluginMock = {
				name:'navymodel2',
				parse:function(phone,cb){
					cb(null,{test:"移动"});
				},
				model:2
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel2',15900000000,function(err,data){
				err.should.be.equal('plugin navymodel2 parse function must return Object ,and the Object hasOwnProperty : supplier , provice and city, and the value must exist.');
			});
		});
		it('#exe() phone length',function(){
			var pluginMock = {
				name:'navymodel2',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel2',1590000000,function(err,data){
				err.should.be.equal('phone length  must be eleven, current phone is : 1590000000');
			});
		});
		it('#exe() phone isNaN',function(){
			var pluginMock = {
				name:'navymodel2',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel2',"navy",function(err,data){
				err.should.be.equal('phone must be number, current phone is : navy');
			});
		});
		it('#exe() plugin do not exist',function(){
			plugin.exe('navymodel10086',15900000000,function(err,data){
				err.should.be.equal('plugin : navymodel10086 , do not exist, please add it and then use it.');
			});
		});
		it('#exe() plugin url invalid',function(){
			var pluginMock = {
				name:'navymodel3',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				},
				url:"test"
			};
			plugin.add(pluginMock);
			plugin.exe('navymodel3',15900000000,function(err,data){
				err.should.be.equal('plugin : navymodel3, url param must be function.');
			});
		});
		it('#exe() plugin url invalid',function(){
			var pluginMock = {
				name:'navymodel3',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				},
				url:function(){}
			};
			plugin.add(pluginMock,true);
			plugin.exe('navymodel3',15900000000,function(err,data){
				err.should.be.equal('plugin : navymodel3 must be return url string.');
			});
		});
		describe('exe function muk request',function(){
			before(function(){
				muk(request,'request',function(url,option,callback){
					describe('url should be ok',function(){
						url.should.be.equal("http://navy.com?phone=15900000000");
						option.timeout.should.be.equal(1000);
					});
					process.nextTick(function(){
						callback(null,{supplier:"移动"});
					})
				})
			});
			after(function(){
				muk.restore();
			});
			it('#exe url timeout ok',function(done){
				var pluginMock = {
					name:'navymodel3',
					parse:function(phone,cb){
						cb(null,{supplier:"移动"});
					},
					url:function(phone){return "http://navy.com?phone="+phone}
				};
				plugin.add(pluginMock,true);
				plugin.exe('navymodel3',15900000000,1000,function(err,data){
					data.should.have.properties({abbreviation:'China_Mobile',phone:15900000000,supplier:'中国移动'});
					done(err);
				});
			})
		});
		after(function(){
			plugin.delete('navyexe');
		});
	});
	describe("check",function(){
		it('#check() fail',function(done){
			plugin.check('invalid',function(err,data){
				done(data);
			})
		});
		it('#check() ok',function(done){
			var pluginMock = {
				name:'checkPlugin',
				parse:function(phone,cb){
					cb(null,{supplier:"移动"});
				}
			};
			plugin.add(pluginMock,true);
			plugin.check('checkPlugin',function(err,data){
				done(err);
			})
		});
	});
});
