const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    googleID: String,
    facebookID: String
});

module.exports = mongoose.model('Buyer', buyerSchema);