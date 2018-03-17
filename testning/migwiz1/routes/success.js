var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("hello from success");
  res.render('success', { });
});

module.exports = router;
