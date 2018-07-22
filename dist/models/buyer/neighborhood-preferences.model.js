'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neighborhoodPreferenceSchema = new Schema({
    preferencesID: String,
    caresAboutSchoolChoice: Boolean,
    caresAboutGroceryStores: Boolean,
    caresAboutHospitals: Boolean,
    caresAboutCrimeScore: Boolean,
    caresAboutParks: Boolean
});

module.exports = mongoose.model('Neighborhood-Preference', neighborhoodPreferenceSchema);