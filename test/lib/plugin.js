var should = require('should');
var plugin = require('../../lib/plugin');
var util = require('../../lib/util');
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
	it('#add()',function(){
		plugin.add(util.loadPlugin('360'));
		plugin.getAll().key.length.should.be.equal(3);
		plugin.getAll().key.indexOf('360').should.be.not.equal(-1);
	});
	it('#get()',function(){
		plugin.get('360').name.should.be.equal('360');
	});
	it('#exe()',function(){
		var pluginMock = {
			name:'navy',
			parse:function(phone,cb){
				cb(null,{supplier:"移动"});
			},
			keyMap:{}
		};
		pluginMock['keyMap'][util.getSupplierKey()] = 'supplier';
		plugin.add(pluginMock);
		plugin.exe('navy',15900000000,function(err,data){
			data.phone.should.be.equal(15900000000);
			data.supplier.should.be.equal("中国移动");
		});
	});
	it('#add() cover',function(){
		var pluginMock = {
			name:'navy',
			parse:function(phone,cb){
				cb(null,{supplier:"移动"});
			},
			keyMap:{}
		};
		pluginMock['keyMap'][util.getSupplierKey()] = 'supplier';
		pluginMock['keyMap'][util.getProvinceKey()] = 'province';
		plugin.add(pluginMock,true);
		plugin.get('navy').keyMap.should.have.property(util.getProvinceKey());
	});
	it('#add() array',function(){
		var pluginMock = {
			name:'navy2',
			parse:function(phone,cb){
				cb(null,{supplier:"移动"});
			},
			keyMap:{}
		};
		pluginMock['keyMap'][util.getSupplierKey()] = 'supplier';
		pluginMock['keyMap'][util.getProvinceKey()] = 'province';
		plugin.add([pluginMock]);
		plugin.get('navy').keyMap.should.have.property(util.getProvinceKey());
	});
	it('#_check() cover',function(){
		var pluginMock = {
			name:'navy',
			parse:function(phone,cb){
				cb(null,{supplier:"移动"});
			}
		};
		plugin._check(pluginMock).should.be.false;
	});
	it('#reset() cover',function(){
		plugin.reset();
		plugin.getAll().key.length.should.be.equal(0);
	});
});
