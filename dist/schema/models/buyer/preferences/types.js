'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.preference = undefined;

var _graphql = require('graphql');

var _types = require('./property-preferences/types');

var _types2 = _interopRequireDefault(_types);

var _types3 = require('./neighborhood-preferences/types');

var _types4 = _interopRequireDefault(_types3);

var _propertyPreferences = require('../../../../models/buyer/property-preferences.model');

var _neighborhoodPreferences = require('../../../../models/buyer/neighborhood-preferences.model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var preference = exports.preference = new _graphql.GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: function fields() {
        return {
            id: { type: GraphQLID },
            propertyPreference: {
                type: _types2.default,
                description: 'Propery preferences for the Buyer',
                resolve: function resolve(parent) {
                    return (0, _propertyPreferences.find)({ preferencesID: parent.id });
                }
            },
            neighboorhoodPreference: {
                type: _types4.default,
                description: 'Neighboorhood preferences for the Buyer',
                resolve: function resolve(parent) {
                    return (0, _neighborhoodPreferences.find)({ preferencesID: parent.id });
                }
            }
        };
    }
});