var router = require('express').Router();

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    // res.send({ok: true});
    res.send('<h1>Auidio Uploads</h1>');
  });

module.exports = router;
