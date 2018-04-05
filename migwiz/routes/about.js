var express = require('express');
var router = express.Router();

// -------------------------------
// ABOUT
// -------------------------------

router.get('/', function(req, res, next) {
  res.render('about', { });
});

module.exports = router;
