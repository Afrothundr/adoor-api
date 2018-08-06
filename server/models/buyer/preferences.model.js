const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const neighborhoodPreference = require('./neighborhood-preferences.model');
const propertyPreference = require('./property-preferences.model').default;

const preferencesSchema = new Schema({
    buyerID: String,
    neighborhood_preferences: Schema.Types.ObjectId,
    property_preferences: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Preference', preferencesSchema);