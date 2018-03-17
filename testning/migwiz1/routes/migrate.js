var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("hello from migrate");
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
            }
            
            // MONGODB INSERT
            // MOONGOOSE VERSION
            // var mongoDB = 'mongodb://username:password@host:port/database?options...';
            mongoose.connect('mongoDB://localhost:27017/keystonejs', function(){
                console.log("connected");
            });
            
            var conn = mongoose.connection;
            var meme = {
                name: {
                    first: 'elin',
                    last: 'andersson'
                },
                username: 'moose',
                password: 'hash',
                email: 'meieiak@lsg.se',
                regdate: 2015-16-25,
                isAdmin: false
            }

            conn.collection('users').insert(meme, function () {
                console.log("tried to insert");
            });
            //mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

	  	    }
        var migStatus = true;
        res.render('success', { migStatus: migStatus, userList: userList });
    });
    con.end();
});

module.exports = router;
