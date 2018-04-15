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
      database: "wordpress"
    });
    
    con1.connect();
    // object to hold users
    var userList = [];
    
    // QUERY
    // First get all users 
    // ------------------
    con1.query('SELECT ID, user_login, user_email, user_registered FROM wp_users;', function(err, rows, fields) {
        if (err) {
            // no
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // loop through result
            console.log("found" + rows.length + " users");
	  		for (var i = 0; i < rows.length; i++) {
                
                // generate a random activation key 
                var key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                
	  			// save result in object
                // default - they're all students
                // and no admin access
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
                    'subname': rows[i].user_login,
                    'activation_key': key,
                    'isKeyActive': true,
		  		}
                // Add object into array
		  		userList.push(user);

            }
            
            // INSERTION
            // connecting to mongodb
            // via mongoose
            mongoose.connect('mongoDB://localhost:27017/keystone', function(){
                console.log('connected');
            });
            // inserting 
            var conn = mongoose.connection;
            conn.collection('users').insert(userList, function(err, result) {
                if(err){
                    console.log(err);
                }else{
                    console.log(result);
                }
            });
	  	}
        
        var migStatus = true;
        res.render('success', { 
            migStatus: migStatus, 
            userList: userList, 
        });
        
    });

    // close con
    con1.end();
});
module.exports = router;