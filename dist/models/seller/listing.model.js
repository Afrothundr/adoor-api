'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listingSchema = new Schema({
    pictures: [String],
    description: String,
    bedrooms: Number,
    bathrooms: Number,
    squareFootage: Number,
    price: Number,
    priceHistory: [Number],
    views: Number,
    yearBuilt: Number,
    renovatedYearn: Number,
    heating: String,
    cooling: String,
    kitchenType: String,
    laundry: String,
    fireplace: Boolean

});

module.exports = mongoose.model('Listing', listingSchema);