var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mysql = require('mysql');
var User = require('../models/user.js');
var app = express();


router.get('/', function(req, res, next) {
    
    // Putting posts into one table
    
    var connection2 = mysql.createConnection({
        host: req.app.locals.mysql_host,
        user: req.app.locals.mysql_user,
        password: req.app.locals.mysql_pw,
        database: req.app.locals.mysql_db
    });

    connection2.connect();

    // Putting all posts into one table
    // Its just easier this way to map author + _id
    for(var i = 0; i < req.app.locals.numOfUsers; i++){
        connection2.query("INSERT INTO all_user_posts SELECT ID, post_author, post_title, post_date, post_modified, post_type, post_content, post_password, post_status, post_name, post_parent FROM wp_" + i + "_posts;", function(err, result) {
            if(err){
                req.error = true;
                req.err = err;
            } else {
                req.error = false;
                next();
            }
        });
    }
});

router.get('/', function(req, res, next) {
    
    var con = mysql.createConnection({
        host: req.app.locals.mysql_host,
        user: req.app.locals.mysql_user,
        password: req.app.locals.mysql_pw,
        database: req.app.locals.mysql_db
    });
    con.connect();
    
    // variables
    var posts = [];
    var query = "SELECT all_user_posts.post_id, all_user_posts.post_author, all_user_posts.post_title, all_user_posts.post_date, all_user_posts.post_modified, all_user_posts.post_type, all_user_posts.post_content, all_user_posts.post_password, all_user_posts.post_status, all_user_posts.post_name, all_user_posts.post_parent, keystone_id_map.k_id FROM all_user_posts INNER JOIN keystone_id_map ON all_user_posts.post_author = keystone_id_map.wp_id;";
    
    // QUERY
    // ------------------
    con.query(query, function(err, rows, fields) {
        
        if (err) {
            console.log(err);
        } else {
            // loop through result
            for (var i = 0; i < rows.length; i++) {
                
                    // setting correct syntax for published posts
                    var kState = rows[i].post_status;
                    var state;
                
                    if(kState == "publish"){
                        state = "published";
                    }else{
                        state = "draft";
                    }
                
                    // generate a random slug
                    var slug = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
                    // making sure author relationship will work
                    var ObjectID = mongoose.Types.ObjectId;

                    // save to object
                    var post = {
                        'slug': slug,
                        'title': rows[i].post_title,
                        'state': state,
                        'author': new ObjectID(rows[i].k_id),
                        'publishedDate': rows[i].post_date,
                        'modifiedDate': rows[i].post_modified,
                        'wp_id': rows[i].post_author,
                        'type': rows[i].post_type,
                        'content': {
                            'extended': rows[i].post_content,
                        },
                        'password': rows[i].post_password,
                        'post_id': rows[i].post_id,
                        'post_parent': rows[i].post_parent,
                    }

                    // Add object into array
                    posts.push(post);
                }
            
            mongoose.connect(req.app.locals.keystone, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('connected');
                }
            });

            // inserting 
            var conn2 = mongoose.connection;
            conn2.collection('posts').insert(posts, function(err, result) {
                
                if(err){
                    console.log(err);
                    var mig = {
                        'success': false,
                        'error': err,
                    }
                    res.render('migrate', { mig: mig });
                    
                } else {
                    var mig = {
                        'success': true,
                        'msg': 'Step 3 complete! Wow, the migration is actually complete now.',
                        'next': ' ',
                        'first': 'check-green.png',
                        'second': 'check-green.png',
                        'third': 'check-green.png',
                        'fourth': 'check-green.png',
                        'done': true,
                    }

                    res.render('migrate', { mig: mig });
                }
            });
        }
    });

    // close con
    con.end();
});

module.exports = router;
