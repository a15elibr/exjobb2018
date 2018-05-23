var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();


// ----------------------
// Testing
// Adding posts to WordPress
// ----------------------


router.get('/', function(req, res, next){   
    
    var db = req.app.locals.mysql_db;
    res.render('test', {db});
    
});

module.exports = router;
