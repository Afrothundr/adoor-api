const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const demographicsSchema = new Schema({
    income: Number,
    kids: Number,
    ages: Number,
    pets: String,
    ageRange: Number,
    gender: String
});

module.exports = mongoose.model('Demographic', demographicsSchema);