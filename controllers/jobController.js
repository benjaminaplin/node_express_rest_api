
var jobController = function (Job) {
  var post = function (req, res) {
    var job = new Job(req.body);
    if (!req.body.company_name) {

      res.status(400);
      res.send('Company name is required')
    } else {
      job.save()
      res.status(201)
      res.send(job);
    }
  }

  var get = function (req, res) {
    var query = {};
    if (req.query.company_name) {
      query.company_name = req.query.company_name;
    }
    Job.find(query, function (err, jobs) {
      if (err)
        res.status(500).send(err);
      else
        //these are mongoose models,
        // not just json obj
        var returnJobs = []
      jobs.forEach(function (e, i, a) {
        var newJob = e.toJSON();
        newJob.links = {
          self: "http://" + req.headers.host + '/api/jobs/' + newJob._id
        }
        returnJobs.push(newJob)
      })
      res.json(returnJobs);
    })
  }

  var getById = function (req, res) {
    var returnJob = req.job.toJSON()
    var newLink = "http://" + req.headers.host + '/api/jobs/?company_name=' + returnJob.company_name
    returnJob.links = {
      FilterByThisCompanyName: newLink.replace(' ', '%20')
    }
    res.json(returnJob);
  }

  var put = function (req, res) {
    req.job.company_name = req.body.company_name
    req.job.title = req.body.title
    req.job.status = req.body.status
    req.job.date_applied = req.body.date_applied
    req.job.contact_person = req.body.contact_person
    req.job.save(function (err) {
      if (err)
        res.status(500).send(err);
      else {
        res.json(req.job);
      }
    });

  }

  var patch = function (req, res) {
    if (req.body._id)
      delete req.body._id;
    for (var p in req.body) {
      req.job[p] = req.body[p];
    }
    req.job.save(function (err) {
      if (err)
        res.status(500).send(err)
      else
        res.json(req.body)
    })
  }

  var deleteJob = function (req, res) {
    req.job.remove(function (err) {
      if (err)
        res.status(500).send(err)
      else {
        res.status(204).send('Removed')
      }
    })
  }

  return {
    deleteJob: deleteJob,
    patch: patch,
    put: put,
    getById: getById,
    post: post,
    get: get
  }
}

module.exports = jobController;