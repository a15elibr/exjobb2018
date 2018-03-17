var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hello from index");
  res.render('index', { });
});

module.exports = router;
