var should = require('should');
var request = require('../../lib/request');
describe('#request()', function() {
  it('request', function(done) {
    request.request('https://www.baidu.com', {
      timeout: 20000
    }, function(err, data) {
      done(err);
    })
  });
})