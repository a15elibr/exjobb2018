var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mysql = require('mysql');
var User = require('../models/user.js');
var app = express();

// -----------------------
// Migrate: step 2
// Insert users and posts
// -----------------------


router.get('/', function(req, res, next){   
    
    // INSERT USERS
    
    mongoose.connect(req.app.locals.keystone, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('connected');
        }
    });
    
    // inserting 
    var conn = mongoose.connection;
    conn.collection('users').insert(req.app.locals.userList, function(err, result) {
        if(err){
            console.log(err);
            var mig = {
                'success': false,
                'error': err,
            }
            res.render('migrate', { mig: mig });
            
        } else {
            console.log("inserted users");
            next();
        }
    });

});

router.get('/', function(req, res, next){   
    
    // get _id of each wp_id
    
    mongoose.connect(req.app.locals.keystone, function(err){
        if(err){
            console.log(err);
        }else{
            console.log('connected');
        }
    });

    var users = [];
    User.find({ group: 'student' }, '_id wp_id', function(err, rows, fields) 
    {
        if (err){
            console.log(err);
            next(err);
        } else {
            for(var i = 0; i < rows.length; i++){
                user = [
                        rows[i].wp_id,
                        rows[i]._id
                ];
                users.push(user);
            }
            req.users = users;
            next();
        }
    });
});

router.get('/', function(req, res, next){   

    // Inserting _id's to keystone_id_map
    
    var connection6 = mysql.createConnection({
        multipleStatements: true,
        host: req.app.locals.mysql_host,
        user: req.app.locals.mysql_user,
        password: req.app.locals.mysql_pw,
        database: req.app.locals.mysql_db
    });
    connection6.connect();
    
    var sql = "INSERT INTO keystone_id_map (wp_id, k_id) VALUES ?";
    connection6.query(sql, [req.users], function(err){
        if(err){
            console.log(err);
            var mig = {
                'success': false,
                'error': err,
            }
            res.render('migrate', { mig: mig });
            
        } else {
            console.log("inserted ID mapping");
            next();
        }
        connection6.end();
    });
    
});

router.get('/', function(req, res, next) {
    
    if(req.error){
        
        var mig = {
            'success': false,
            'error': req.err,
        }
        res.render('migrate', { mig: mig });
        
    } else {
        
        // Mysql 
        var connection2 = mysql.createConnection({
            host: req.app.locals.mysql_host,
            user: req.app.locals.mysql_user,
            password: req.app.locals.mysql_pw,
            database: req.app.locals.mysql_db
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
    }
});

module.exports = router;
