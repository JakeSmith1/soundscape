var router = require('express').Router();

// setup boilerplate route jsut to satisfy a request
// for building
router.route('/')
  .get(function(req, res){
    res.send({ok: true});
  });

module.exports = router;
