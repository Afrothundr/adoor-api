const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertyPreferenceSchema = new Schema({
    price : Number,
    zipCode : Number,
    bathrooms : Number,
    bedrooms : Number,
    squareFootage: Number    
});

module.exports = mongoose.model('Property-Preference', propertyPreferenceSchema);