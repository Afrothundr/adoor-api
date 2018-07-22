'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var propertyPreferenceSchema = new Schema({
    preferencesID: String,
    price: Number,
    zipCode: Number,
    bathrooms: Number,
    bedrooms: Number,
    squareFootage: Number
});

module.exports = mongoose.model('Property-Preference', propertyPreferenceSchema);