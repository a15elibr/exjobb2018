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
        }
        connection6.end();
    })
    res.render('migrate3', { users: req.users});
    
});
module.exports = router;
