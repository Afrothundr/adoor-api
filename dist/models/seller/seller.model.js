'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sellerSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    email: String,
    company: String,
    profilePicture: String
});

module.exports = mongoose.model('Seller', sellerSchema);