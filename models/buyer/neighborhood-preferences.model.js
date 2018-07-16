const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodPreferenceSchema = new Schema({
    preferencesID: String,
    caresAboutSchoolChoice : Boolean,
    caresAboutGroceryStores : Boolean,
    caresAboutHospitals : Boolean,
    caresAboutCrimeScore : Boolean,
    caresAboutParks : Boolean
});

module.exports = mongoose.model('Neighborhood-Preference', neighborhoodPreferenceSchema);