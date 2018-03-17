var express = require('express');
var router = express.Router();

// ----------------------------
// SUCCESS 
// simple feedback view from insertion 
// ----------------------------

router.get('/', function(req, res, next) {
  res.render('success', { });
});

module.exports = router;
