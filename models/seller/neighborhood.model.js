const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const neighborhoodSchema = new Schema({
    schoolChoice : Number,
    groceryStores : Number,
    hospitals : Number,
    crimeScore : Number,
    parks : Number     
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);