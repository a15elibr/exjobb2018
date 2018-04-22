var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mysql = require('mysql');
var User = require('../models/user.js');

// -----------------------
// Migrate: step 2
// Put all posts from users into 1 table.
// -----------------------

router.get('/', function(req, res, next){   
    
    mongoose.connect('mongoDB://localhost:27017/keystone', function(){
        console.log('connected');
    });

    // Getting the amount of users who have been added
    User.find({ group: 'student' }, function(err, rows, fields) 
    {
        if (err){
            console.log(err);
            next(err);
        } else {
            var users = [];
            for(var i = 0; i < rows.length; i++){
                users.push(rows[i]);
            }
            req.users = users;
            next();
        }
    });
});


router.get('/', function(req, res, next) {
    
    
    
    // Mysql 
    var connection2 = mysql.createConnection({
        // multipleStatements: true,
        host: 'localhost',
        user: 'root',
        password: 'elinis',
        database: 'slash',
    });
    connection2.connect();
    
    // Putting all posts into one table
    // Its just easier this way to map author + _id (in step 3)
    for(var i = 0; i < req.users.length; i++){
        connection2.query("INSERT INTO all_user_posts SELECT ID, post_author, post_title, post_date, post_modified, post_type, post_content, post_password, post_status, post_name, post_parent FROM wp_" + i + "_posts;", function(err, result) {
            if(err){
                req.error = true;
                req.err = err;
            } else {
                req.error = false;
            }
        });
    }
    
    if(req.error){
        var mig = {
            'success': false,
            'error': req.err,
        }
        res.render('migrate', { mig: mig });
        
    } else {
        
        var mig = {
            'success': true,
            'msg': 'Step 2 complete! \nHere is a joke: What do they call Obi-wan Kenobis radioactive brother? Obi-wan Tjernobyl!',
            'next': 'migrate3',
            'first': 'check-green.png',
            'second': 'check-green.png',
            'third': 'check-grey.png',
            'fourth': 'check-grey.png',
            'done': false,
        }

        res.render('migrate', { mig: mig });
    }


});

module.exports = router;