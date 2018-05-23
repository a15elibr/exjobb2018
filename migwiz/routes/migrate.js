var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var app = express();

// ----------------------
// MIGRATE 
// step one: fix the backend
// Create tables 
// Select data
// ----------------------

router.get('/', function(req, res, next) {
   
    // Create table 
    var tblCon = mysql.createConnection({
        host: req.app.locals.mysql_host,
        user: req.app.locals.mysql_user,
        password: req.app.locals.mysql_pw,
        database: req.app.locals.mysql_db
    });
    tblCon.connect();
    
    var SQL = "CREATE TABLE all_user_posts (post_id INT, post_author INT, post_title varchar(255), post_date DATETIME, post_modified DATETIME, post_type varchar(4), post_content nvarchar(4000), post_password varchar(255), post_status varchar(255), post_name varchar(255), post_parent INT, PRIMARY KEY(post_author, post_id));";
    tblCon.query(SQL, function(err, result){
        if(err){
            req.error = true;
            req.err += err;
        } else {
            req.error = false;
        }
    });
    next();
    
});

router.get('/', function(req, res, next) {
   
    // Create table 
    var tblCon2 = mysql.createConnection({
        host: req.app.locals.mysql_host,
        user: req.app.locals.mysql_user,
        password: req.app.locals.mysql_pw,
        database: req.app.locals.mysql_db
    });
    tblCon2.connect();
    
    var SQL = "CREATE TABLE keystone_id_map (wp_id INT, k_id VARCHAR(255), PRIMARY KEY(wp_id, k_id));";
    tblCon2.query(SQL, function(err, result){
        if(err){
            req.error = true;
            req.err += err;
        } else {
            req.error = false;
        }
    });
    next();
    
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
    var userList = [];
    var query = "SELECT wp_users.ID AS wp_id, \
                        wp_users.user_email AS email, \
                        wp_users.user_login AS username, \
                        wp_users.user_registered AS regDate, \
                        wp_blogs.path AS subname, \
                        metafirstname.meta_value AS firstname, \
                        metalastname.meta_value AS lastname, \
                        metadescription.meta_value AS description, \
                        metanickname.meta_value AS nickname \
                FROM    wp_users \
                INNER JOIN wp_blogs ON wp_users.ID = wp_blogs.blog_id \
                LEFT JOIN wp_usermeta metafirstname ON wp_users.ID = metafirstname.user_id AND metafirstname.umeta_id = 25 \
                LEFT JOIN wp_usermeta metalastname ON wp_users.ID = metalastname.user_id AND metalastname.umeta_id = 26 \
                LEFT JOIN wp_usermeta metadescription ON wp_users.ID = metadescription.user_id AND metadescription.umeta_id = 2 \
                LEFT JOIN wp_usermeta metanickname ON wp_users.ID = metanickname.user_id AND metanickname.umeta_id = 1;";
    
    // QUERY
    // ------------------
    con1.query(query, function(err, rows, fields) {
        if (err) {
            console.log(err);
            var mig = {
                'success': false,
                'error': err,
            }
            res.render('migrate', { mig: mig });
        } else {
            
            //save number of fetched users to app.locals
            req.app.locals.numOfUsers = rows.length;
            
            // Loop through result 
            for (var i = 0; i < rows.length; i++) {

                // generate a random activation key 
                var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
                // save to object
		  		var user = {
                    'name': {
                            'first': rows[i].firstname,
                            'last': rows[i].lastname,
                    },
                    'email':rows[i].user_email,
                    'password': undefined,
                    'username':rows[i].user_login,
                    'wp_id':rows[i].ID,
                    'regdate':rows[i].user_registered,
                    'description':rows[i].description,
                    'nickname':rows[i].nickname,
                    'isAdmin':false,
                    'group': 'student',
                    // remove slashes from path
                    'subname': rows[i].path.replace(/\//g, ""),
                    'activation_key': key,
                    'isKeyActive': true,
		  		}
                
                // Add object into array
		  		userList.push(user);
            }
            
            // Save users in app.locals
            req.app.locals.userList = userList;
            
            // Render 
            var mig = {
                'success': true,
                'msg': 'Step one complete! Amazing. \nThe next two steps will do some work in background, while you get to enjoy some... entertainment.',
                'next': 'migrate2',
                'first': 'check-green.png',
                'second': 'check-grey.png',
                'third': 'check-grey.png',
                'fourth': 'check-grey.png',
                'done': false,
            }
            
            res.render('migrate', { mig: mig });
	  	}
    });

    // close con
    con.end();
    
});

module.exports = router;
