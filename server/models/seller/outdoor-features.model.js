const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outdoorFeaturesSchema = new Schema({
    listingID: Schema.Types.ObjectId,
    fencedYard: Boolean,
    sprinklerSystem: Boolean,
    firePit: Boolean,
    pool: Boolean,
    parking : String,
    garage: String
});

module.exports = mongoose.model('Outdoor-Feature', outdoorFeaturesSchema);