var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
    
    var personList = [];
    var url = 'mongodb://localhost:27017/';
    mongodb.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("test");
        dbo.collection("people").find({}).toArray(function(err, result) {
            if (err) {
                res.status(500).json({"status_code": 500,"status_message": "internal server error"});
            } else {
                // Loop check on each row
                for (var i = 0; i < result.length; i++) {

                    // Create an object to save current row's data
                    var person = {
                        'ID':result[i].ID,
                        'name':result[i].name
                    }
                    // Add object into array
                    personList.push(person);
                }
            }
            db.close();
        });
        
        res.render('mongodb', { personList: personList });
    });

});

module.exports = router;
