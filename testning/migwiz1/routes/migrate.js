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

    // object to hold users
    var userList = [];
    
    // MYSQL
    // connect to db
    var con = mysql.createConnection({
      host: "localhost",
      user: "elin",
      password: "elinis",
      database: "test"
    });
    con.connect();
    
    // (( wordPressApp- user_login, user_pass, user_email, user_registered FROM wp_users ))
    // 'SELECT ID, user_login, user_pass, user_email, user_registered FROM wp_users WHERE ID = 5;'
    // (( test - LastName, FirstName, UserName, RegDate, Email, Pass, ID FROM User ))
    // 'SELECT ID, FirstName, LastName, UserName, Email, RegDate, Pass FROM User WHERE ID = 1;'
    
    // query users
    con.query('SELECT ID, FirstName, LastName, UserName, Email, RegDate, Pass FROM User;', function(err, rows, fields) {
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
		  			'ID':rows[i].ID,
                    'name': {
                            'first': rows[i].FirstName,
                            'last': rows[i].LastName
                    },
		  			'username':rows[i].UserName,
                    'password':rows[i].Pass,
                    'email':rows[i].Email,
                    'regdate':rows[i].RegDate,
                    'isAdmin':false,
                    'group': 'student',
                    'subname': rows[i].UserName + 'blog',
		  		}
                // Add object into array
		  		userList.push(user);
            }
            
            // connecting to mongodb
            // via mongoose
            mongoose.connect('mongoDB://localhost:27017/keystonejs', function(){
                console.log("connected");
            });
            // inserting 
            var conn = mongoose.connection;
            conn.collection('users').insert(userList, function () {
                console.log("insertion complete");
            });
	  	}
        // render
        var migStatus = true;
        res.render('success', { migStatus: migStatus, userList: userList });
    });
    // close con
    con.end();
});

module.exports = router;
