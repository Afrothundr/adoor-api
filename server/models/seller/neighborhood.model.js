const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema({
    listingID: Schema.Types.ObjectId,
    schoolRank : Number,
    groceryRank : Number,
    hospitalRank : Number,
    crimeRank : Number,
    parksRank : Number,
    gymRank: Number,
    entertainmentRank: Number
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);