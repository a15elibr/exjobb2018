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

// create model
var User = mongoose.model('User', userSchema);

module.exports = User;