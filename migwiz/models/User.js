var express = require('express');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

    
    // via mongoose
    mongoose.connect('mongoDB://localhost:27017/keystone', function(){
        console.log('connectedBLUEIUTIE');
    });
    var Schema = mongoose.Schema;

    // create a schema
    var userSchema = new Schema({
        name: {
            first: String,
            last: String
        },
        username: String,
        wp_id: Number
    });

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;