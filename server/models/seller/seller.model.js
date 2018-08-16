const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellerSchema = new Schema({
    firstName : String,
    lastName : String,
    bio : String,
    email : String,
    company : String,
    profilePicture: String,
    listings: [Schema.Types.ObjectId]  
});

module.exports = mongoose.model('Seller', sellerSchema);