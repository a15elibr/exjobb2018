var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// ----------------------
// MIGRATE 
// step one: users
// ----------------------

router.get('/', function(req, res, next) {
    
    var con1 = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "elinis",
      database: "slash2"
    });
    
    con1.connect();
    
    // variables
    var userList = [];
    var query = "SELECT wp_users.ID, wp_users.user_email, wp_users.user_login, wp_users.user_registered, wp_blogs.path FROM wp_users INNER JOIN wp_blogs ON wp_users.ID = wp_blogs.blog_id;";
    
    // QUERY
    // ------------------
    con1.query(query, function(err, rows, fields) {
        if (err) {
            console.log(err);
            
        } else {
            
            for (var i = 0; i < rows.length; i++) {

                // generate a random activation key 
                var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
                // save to object
		  		var user = {
                    'name': {
                            'first': 'noName',
                            'last': 'noName',
                    },
                    'email':rows[i].user_email,
                    'password': undefined,
                    'username':rows[i].user_login,
                    'wp_id':rows[i].ID,
                    'regdate':rows[i].user_registered,
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
            
            // INSERTION
            // connecting to mongodb
            // via mongoose
            mongoose.connect('mongoDB://localhost:27017/keystone', function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log('connected');
                }
            });
            
            // inserting 
            var conn = mongoose.connection;
            conn.collection('users').insert(userList, function(err, result) {
                if(err){
                    console.log(err);
                    var mig = {
                        'success': false,
                        'error': err,
                    }
                    res.render('migrate', { mig: mig });
                } else {
                    console.log("user insertion successfull");
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
             
	  	}
    });

    // close con
    con1.end();
    
});


module.exports = router;



