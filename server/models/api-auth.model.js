const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const apiAuthSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    apiKey: String,
});

module.exports = mongoose.model('Api-Auth-Key', apiAuthSchema);