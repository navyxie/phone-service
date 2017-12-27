var should = require('should');
var PS = require('../../lib/index');
var plugin = require('../../lib/plugin');
var util = require('../../lib/util');
describe('#phoneService()', function() {
  it('should be ok', function(done) {
    PS.query(15900000000, {
      plugins: ['360', 'tenpay', 'taobao']
    }, function(err, data) {
      console.log(data);
      should.not.exist(err);
      data.supplier.should.be.equal('中国移动');
      data.abbreviation.should.be.equal('China_Mobile');
      done(err);
    });
  });
  it('should be ok', function(done) {
    PS.query(15900000000, {
      model: 1
    }, function(err, data) {
      console.log(data);
      should.not.exist(err);
      data.supplier.should.be.equal('中国移动');
      data.provice.should.be.containEql('广东');
      data.province.should.be.containEql('广东');
      data.abbreviation.should.be.equal('China_Mobile');
      done(err);
    });
  });
  it('should be ok', function(done) {
    PS.query(15900000000, {
      model: 2
    }, function(err, data) {
      console.log(data);
      should.not.exist(err);
      data.supplier.should.be.equal('中国移动');
      data.provice.should.be.containEql('广东');
      data.province.should.be.containEql('广东');
      data.city.should.be.containEql('中山');
      data.abbreviation.should.be.equal('China_Mobile');
      done(err);
    });
  });
  it('should be ok', function(done) {
    PS.query(15900000000, {
      model: 2,
      parallel: 0
    }, function(err, data) {
      console.log(data);
      should.not.exist(err);
      data.supplier.should.be.equal('中国移动');
      data.provice.should.be.containEql('广东');
      data.province.should.be.containEql('广东');
      data.city.should.be.containEql('中山');
      data.abbreviation.should.be.equal('China_Mobile');
      done(err);
    });
  });
  it('should be ok', function(done) {
    PS.query(18612596520, {
      model: 2,
      parallel: 0
    }, function(err, data) {
      console.log(data);
      should.not.exist(err);
      data.supplier.should.be.equal('中国联通');
      data.provice.should.be.containEql('北京');
      data.province.should.be.containEql('北京');
      data.city.should.be.containEql('北京');
      data.abbreviation.should.be.equal('China_Unicom');
      done(err);
    });
  });
  it('should be ok, promise', function(done) {
    PS.query(15900000000, {
      model: 1
    }).then(function(data) {
      data.supplier.should.be.equal('中国移动');
      data.provice.should.be.containEql('广东');
      data.abbreviation.should.be.equal('China_Mobile');
      done();
    })
  });

  it('should be not ok, promise', function(done) {
    PS.query(1590000000, {
      model: 1
    }).catch(function(err) {
      err.should.not.be.ok;
      done();
    })
  });
  it('should be ok', function() {
    plugin.add(util.loadPlugin('static'));
    PS.isPhone(15900000000).should.be.ok();
  });
  it('should be ok', function() {
    plugin.add(util.loadPlugin('static'));
    PS.isChinaMobile(15900000000).should.be.ok();
  });
  it('should be not ok', function() {
    plugin.add(util.loadPlugin('static'));
    PS.isChinaTelecom(15900000000).should.be.false();
  });
  it('should be not ok', function() {
    plugin.add(util.loadPlugin('static'));
    PS.isChinaUnicom(15900000000).should.be.false();
  });
})