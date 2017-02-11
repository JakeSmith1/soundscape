var router = require('express').Router();
var audioRouter = require('./audio/audioRouter');

// api router will mount other routers
// for all our resources. Each resource directory
// has a resourceRoutes.js file with the router ready to go,
// require them and mount them to their respective routes below

router.use('/audio', audioRouter);


module.exports = router;
