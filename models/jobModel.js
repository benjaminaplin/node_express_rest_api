var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var jobModel = new Schema({
  company_name: { type: String },
  title: { type: String },
  status: { type: String },
  contact_person: { type: String },
  date_applied: { type: Date }
})

module.exports = mongoose.model('Job', jobModel)