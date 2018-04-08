var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// ----------------------
// MIGRATE 
// As of now: manual connections
// connect to sql --> get users --> insert into object --> connect to mongodb --> insert object
// ----------------------

router.get('/', function(req, res, next) {

    // object to hold everything
    var userList = [];
    
    // MYSQL
    // connect to db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "elinis",
      database: "wordpress"
    });
    con.connect();
    
    // QUERIES
    // ----------------------------------------------------------------------------------------------------------------------------------
    
    // First: Users
    con.query('SELECT ID, user_login, user_email, user_registered, user_status, deleted FROM wp_users;', function(err, rows, fields) {
        if (err) {
            // no
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // loop through result
	  		for (var i = 0; i < rows.length; i++) {
	  			// save result in object
                // default - they're all students
                // and no admin access
		  		var user = {
                    'name': {
                            'first': undefined,
                            'last': undefined,
                    },
                    'email':rows[i].user_email,
                    'password': undefined,
                    'username':rows[i].user_login,
                    'wp_id':rows[i].ID,
                    'regdate':rows[i].user_registered,
                    'isAdmin':false,
                    'group': 'student',
                    'subname': rows[i].user_login,
		  		}
                // Add object into array
		  		userList.push(user);
            }

            // ------------------
            // connecting to mongodb
            // via mongoose
            mongoose.connect('mongoDB://localhost:27017/keystone', function(){
                console.log('connected');
            });
            // inserting 
            var conn = mongoose.connection;
            conn.collection('users').insert(userList, function(err, result) {
                if (err) return handleError(err);
                console.log('inserted ' + result.rows + ' users');
            });
	  	}
        // render
        var migStatus = true;
        res.render('success', { migStatus: migStatus, userList: userList });
    });
    
    // GET POSTS
    // --------- 
    
    // ----------------------------------------------------------------------------------------------------------------------------------
    // close con
    con.end();
});

module.exports = router;
