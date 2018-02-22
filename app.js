var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db = process.env.ENV === 'Test'
  ? mongoose.connect('mongodb://localhost/jobAPI_test')
  : mongoose.connect('mongodb://localhost/jobAPI')

var Job = require('./models/jobModel')
var app = express();
var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

jobRouter = require('./Routes/jobRoutes')(Job)

app.use('/api/Jobs', jobRouter);

app.get('/', function (req, res) {
  res.send('Welcome to my API, bitches!');
});

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

module.exports = app