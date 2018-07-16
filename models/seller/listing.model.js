const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    pictures : [String],
    description : String,
    bedrooms : Number,
    bathrooms : Number,
    squareFootage : Number,
    price : Number,
    priceHistory : [Number],
    views: Number,
    yearBuilt : Number,
    renovatedYear? : Number,
    heating : String,
    cooling : String,
    kitchenType : String,
    laundry : String,
    fireplace: Boolean
    
});

module.exports = mongoose.model('Listing', listingSchema);