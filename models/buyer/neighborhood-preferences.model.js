const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodPreferenceSchema = new Schema({
    caresAboutSchoolChoice : Boolean,
    caresAboutGroceryStores : Boolean,
    caresAboutHospitals : Boolean,
    caresAboutCrimeScore : Boolean,
    caresAboutParks : Boolean
});

module.exports = mongoose.model('Neighborhood-Preference', neighborhoodPreferencesSchema);