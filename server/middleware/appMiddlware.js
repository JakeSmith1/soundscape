var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// global middleware here

module.exports = function(app) {
  app.use(cors());
  app.use(morgan('dev'));
  // app.use(bodyParser.urlencoded({ extended: true }));
  // app.use(bodyParser.json());
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
};
