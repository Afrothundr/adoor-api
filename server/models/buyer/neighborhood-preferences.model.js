const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodPreferenceSchema = new Schema({
    preferencesID: String,
    hasYoungKids : Boolean,
    livesAlone : Boolean,
    hasPets : Boolean,
    exercises : Boolean,
});

module.exports = mongoose.model('Neighborhood-Preference', neighborhoodPreferenceSchema);