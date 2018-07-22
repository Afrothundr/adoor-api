'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outdoorFeaturesSchema = new Schema({
    fencedYard: Boolean,
    sprinklerSystem: Boolean,
    firePit: Boolean,
    pool: Boolean,
    parking: String,
    garage: String

});

module.exports = mongoose.model('Outdoor-Feature', outdoorFeaturesSchema);