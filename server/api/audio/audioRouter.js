var router = require('express').Router();

//route specific middleware
router.use(function(req, res, next) {
  if(req.body.coordinates) {
    req.lat = req.body.coordinates.lat;
    req.lng = req.body.coordinates.lng;
  }
  next();
})

//route for testing before front end built out
router.route('/')
  .get(function(req, res){
    res.send('<h1>Auidio Uploads</h1>');
  });

router.post('/save', function(req, res) {
  res.status(200).json({lat: req.lat, lng: req.lng});
})

module.exports = router;
