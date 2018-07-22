'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var neighborhoodSchema = new Schema({
    schoolChoice: Number,
    groceryStores: Number,
    hospitals: Number,
    crimeScore: Number,
    parks: Number
});

module.exports = mongoose.model('Neighborhood', neighborhoodSchema);