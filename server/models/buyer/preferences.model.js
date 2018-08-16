const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({
    buyerID: String,
    neighborhood_preferences: Schema.Types.ObjectId,
    property_preferences: Schema.Types.ObjectId,
});

module.exports = mongoose.model('Preference', preferencesSchema);