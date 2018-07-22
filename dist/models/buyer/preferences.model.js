'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var neighborhoodPreference = require('./neighborhood-preferences.model');
var propertyPreference = require('./property-preferences.model');

var preferencesSchema = new Schema({
    buyerID: String,
    neighborhood_preferences: Schema.Types.ObjectId,
    property_preferences: Schema.Types.ObjectId
});

module.exports = mongoose.model('Preference', preferencesSchema);