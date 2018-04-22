var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mysql = require('mysql');
var User = require('../models/user.js');

router.get('/', function(req, res, next){   
    
    mongoose.connect('mongoDB://localhost:27017/keystone', function(){
        console.log('connected');
    });

    var users = [];
    
    // Getting the amount of users who have been added
    User.find({ group: 'student' }, '_id wp_id', function(err, rows, fields) 
    {
        if (err){
            console.log(err);
            next(err);
        } else {
            for(var i = 0; i < rows.length; i++){
                user = [
                        rows[i].wp_id,
                        rows[i]._id
                ];
                users.push(user);
            }
            req.users = users;
            next();
        }
    });
});

router.get('/', function(req, res, next){   

    // Mysql 
    var connection6 = mysql.createConnection({
        multipleStatements: true,
        host: 'localhost',
        user: 'root',
        password: 'elinis',
        database: 'slash',
    });
    connection6.connect();
    
    var sql = "INSERT INTO keystone_id_map2 (wp_id, k_id) VALUES ?";
    console.log(req.users);
    connection6.query(sql, [req.users], function(err){
        if(err){
            console.log(err);
            var mig = {
                'success': false,
                'error': err,
            }
            res.render('migrate', { mig: mig });
            
        } else {
            var mig = {
                'success': true,
                'msg': 'Step 3 complete! This is going really well! \nAnother joke: What has 4 letters, sometimes has 9 letters, always has 6 letters, but never has 5 letters.',
                'next': 'migrate4',
                'first': 'check-green.png',
                'second': 'check-green.png',
                'third': 'check-green.png',
                'fourth': 'check-grey.png',
                'done': false,
            }

            res.render('migrate', { mig: mig });
        }
        connection6.end();
    });
    
});
module.exports = router;
