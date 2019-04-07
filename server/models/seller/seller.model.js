const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    firstName: String,
    lastName: String,
    bio: String,
    phoneNumber: String,
    googleID: String,
    facebookID: String,
    password: String,
    email: String,
    company: String,
    title: String,
    profilePicture: String,
    listings: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Seller', sellerSchema);