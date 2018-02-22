var should = require('should')
var request = require('supertest')
var app = require('../app.js')
var mongoose = require('mongoose');
var Job = mongoose.model('Job')
var agent = request.agent(app)

describe('Job Crud Test', function () {
  it('Should allow a job to be posted and return a company_name and _id', function (done) {
    var jobPost = {
      company_name: "balls",
      contact_person: "balls",
      status: "balls"
    }

    agent.post('/api/Jobs')
      .send(jobPost)
      .expect(200)
      .end(function (err, results) {
        results.body.company_name.should.equal("balls");
        results.body.should.have.property('_id')
        done()
      })
  })

  afterEach(function (done) {
    Job.remove().exec()
    done()
  })
})



