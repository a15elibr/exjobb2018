var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

// ------------------------
// Migrate step 2
// ------------------------

router.get('/', function(req, res, next) {
 var con2 = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "elinis",
      database: "wordpress"
    });
    con2.connect();
    // QUERY
    // First get all users 
    // ------------------
    var userList = [];
    var i = 3;
    con2.query('SELECT post_title FROM wp_${i}_posts;', function(err, rows, fields) {
        if (err) {
            // no
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            userList.push(rows[0].post_title);
	  	}
        
        res.render('mongo', {  
            userList: userList, 
        });
    });

    // close con
    con2.end();
});

module.exports = router;
