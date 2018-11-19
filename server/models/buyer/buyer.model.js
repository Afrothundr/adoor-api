const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const buyerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    googleID: String,
    facebookID: String,
    preferences: Schema.Types.ObjectId,
    matches: [ Schema.Types.ObjectId ],
    favoriteMatches: [ Schema.Types.ObjectId ],
    demographics: Schema.Types.ObjectId
});

module.exports = mongoose.model('Buyer', buyerSchema);