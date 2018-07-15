const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const neighborhoodPreference = require('./neighborhood-preferences.model');
const propertyPreference = require('./property-preferences.model');

const preferencesSchema = new Schema({
    neighborhood_preferences: new neighborhoodPreference.objectId,
    property_preferences: new propertyPreference.objectId
});

module.exports = mongoose.model('Preference', preferencesSchema);