var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var personList = [];
    
    // connect to db
    var con = mysql.createConnection({
      host: "localhost",
      user: "elin",
      password: "elinis",
      database: "test"
    });
    con.connect();

    // query data
    con.query('SELECT * FROM Person', function(err, rows, fields) {
        if (err) {
            res.status(500).json({"status_code": 500,"status_message": "internal server error"});
        } else {
            // Loop check on each row
	  		for (var i = 0; i < rows.length; i++) {

	  			// Create an object to save current row's data
		  		var person = {
		  			'ID':rows[i].ID,
		  			'FirstName':rows[i].FirstName
		  		}
		  		// Add object into array
		  		personList.push(person);
	  	    }
        }
        
        res.render('mysql', { personList: personList });
    });
    
    con.end();
    
  
});

module.exports = router;
