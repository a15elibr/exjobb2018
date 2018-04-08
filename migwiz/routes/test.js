var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');


/* GET test page. */
router.get('/', function(req, res, next) {
    
    var user = [];
    
    // via mongoose
    mongoose.connect('mongoDB://localhost:27017/keystone', function(){
        console.log('connected');
    });

    User.find({ username: 'piraten92' }, function(err, user) {
      if (err) throw err;

      // object of the user
      console.log(user);
    res.render('test', { user: user });
    });
});
module.exports = router;
