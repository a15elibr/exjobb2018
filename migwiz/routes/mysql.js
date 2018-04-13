var express = require('express');
var mysql = require('mysql');
var express = require('express');

// MYSQL
// connect to db
    var con = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "elinis",
      database: "wordpress"
    });
    con.connect();

// make this available to our users in our Node applications
module.exports = con;