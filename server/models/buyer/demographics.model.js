const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demographicsSchema = new Schema({
    buyerID: String,
    income: Number,
    kids: Number,
    pets: String,
    ageRange: Number,
    gender: String
});

module.exports = mongoose.model('Demographic', demographicsSchema);