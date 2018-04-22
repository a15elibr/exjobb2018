var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mysql = require('mysql');
var User = require('../models/user.js');

router.get('/', function(req, res, next){   
    
    var tests = [];
    var test1 = {
        complete: true,
        msg: "hello from test1",
    }
    tests.push(test1);
    req.test = tests;
    next();
});

router.get('/', function(req, res, next){   

    var test2 = {
        complete: false,
        msg: "hello from test2",
    }
    req.test.push(test2);
    res.render('test', {test: req.test});
    
});
module.exports = router;
