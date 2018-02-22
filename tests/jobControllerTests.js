var should = require('should')
var sinon = require('sinon')

describe('Job Controller Tests', function () {
  describe('Post', function () {
    it('should not allow an empty company_name on post', function () {
      var Job = function (job) { this.save = function () { } }
      var req = {
        body: {
          company_name: ""
        }
      }

      var res = {
        status: sinon.spy(),
        send: sinon.spy()
      }
      var jobController = require('../controllers/jobController')(Job);
      jobController.post(req, res)
      res.status.calledWith(400).should.equal(
        true,
        'Bad Status ' + res.status.args[0][0])
      res.send.calledWith('Company name is required').should.equal(true);
    })
  })
})