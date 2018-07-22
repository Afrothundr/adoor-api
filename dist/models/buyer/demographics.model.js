'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var demographicsSchema = new Schema({
    buyerID: String,
    income: Number,
    kids: Number,
    pets: String,
    ageRange: Number,
    gender: String
});

module.exports = mongoose.model('Demographic', demographicsSchema);