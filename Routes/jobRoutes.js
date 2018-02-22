var express = require('express');

var routes = function (Job) {
  var jobRouter = express.Router();
  var jobController = require('../controllers/jobController')(Job)
  jobRouter.route('/')
    .post(jobController.post)
    .get(jobController.get);

  jobRouter.use('/:jobId', function (req, res, next) {
    Job.findById(req.params.jobId, function (err, job) {
      if (err)
        res.status(500).send(err);
      else if (job) {
        req.job = job;
        next()
      } else {
        res.status(404).send('no job found')
      }
    })
  })
  jobRouter.route('/:jobId')
    .get(jobController.getById)
    .put(jobController.put)
    .patch(jobController.patch)
    .delete(jobController.deleteJob)
  return jobRouter;
};

module.exports = routes;