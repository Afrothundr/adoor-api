'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var buyerSchema = new Schema({
    firstName: String,
    lastname: String,
    email: String,
    phoneNumber: String,
    password: String,
    googleID: String,
    facebookID: String
});

module.exports = mongoose.model('Buyer', buyerSchema);