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
            throw err;
            console.log('throw err');
        } else if (result.length){
            res.render('mongodb', { personList: result });
            console.log('I found some data');
            
        } else {
            console.log('I found no data');
            res.render('mongodb', { });
        }
        db.close();
      });
    });

});

module.exports = router;
