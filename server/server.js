var express = require('express');
var app = express();
var api = require('./api/api');

// app global middlware
require('./middleware/appMiddlware')(app);

// api
app.use('/api/', api);

// set up global error handling
app.use(function(err, req, res, next) {
  if(err) {console.log(err)}
  next();
})

// export the app for testing
module.exports = app;
