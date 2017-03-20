var should = require('should');
var plugin = require('../../lib/plugin');
var taobaoPlugin = require('../../plugin/taobao');
describe('#taobao()', function() {
  it('should be ok', function(done) {
    plugin.add(taobaoPlugin);
    plugin.exe('taobao', 15900000000, function(err, data) {
      console.log(data);
      done(err);
    });
  })
});