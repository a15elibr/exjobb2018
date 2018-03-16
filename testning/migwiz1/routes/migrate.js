var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mongodb = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
    
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

    // QUERY DATA
    // starting with one user 
    // (( wordPressApp- user_login, user_pass, user_email, user_registered FROM wp_users ))
    // 'SELECT ID, user_login, user_pass, user_email, user_registered FROM wp_users WHERE ID = 5;'
    // (( test - LastName, FirstName, UserName, RegDate, Email, Pass, ID FROM User ))
    // 'SELECT ID, FirstName, LastName, UserName, Email, RegDate, Pass FROM User WHERE ID = 1;'
    
    con.query('SELECT ID, FirstName, LastName, UserName, Email, RegDate, Pass FROM User;', function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // looping will be useful when selecting more than 1
	  		for (var i = 0; i < rows.length; i++) {
                
	  			// save result in object
		  		var user = {
		  			'ID':rows[i].ID,
                    'name': {
                            'first': rows[i].FirstName,
                            'last': rows[i].LastName
                    },
		  			'userName':rows[i].UserName,
                    'password':rows[i].Pass,
                    'email':rows[i].Email,
                    'regDate':rows[i].RegDate,
                    'isAdmin':false
		  		}
                // Add object into array
		  		userList.push(user);
                
                // MONGODB INSERT
                // Connect to MONGO DB
                var url = 'mongodb://localhost:27017/';
                mongodb.connect(url, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("test");
                    dbo.collection("users").insertMany(userList, function(err, res) {
                        if (err) throw err;
                        console.log("Number of documents inserted: " + res.insertedCount);
                        db.close();
                    });
                });
	  	    }
        }
        var migStatus = true;
        res.render('index', { migStatus: migStatus, userList: userList });
    });
    con.end();
});

module.exports = router;
