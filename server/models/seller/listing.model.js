const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    sellerID: Schema.Types.ObjectId,
    address: String,
    city: String,
    state: String,
    zipcode: Number,
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
    fireplace: Boolean,
    outdoor_features: Schema.Types.ObjectId,
    neighboorhood: Schema.Types.ObjectId
});

module.exports = mongoose.model('Listing', listingSchema);