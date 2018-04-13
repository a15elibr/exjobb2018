var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


/* GET test page. */
router.get('/', function(req, res, next) {
    var userList = [];
    res.render('test', { userList: userList });
});


module.exports = router;
