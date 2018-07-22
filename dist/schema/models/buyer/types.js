'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buyer = undefined;

var _graphql = require('graphql');

var _demographics = require('../../../models/buyer/demographics.model');

var _preferences = require('../../../models/buyer/preferences.model');

var _types = require('./demographics/types');

var _types2 = _interopRequireDefault(_types);

var _types3 = require('./preferences/types');

var _types4 = _interopRequireDefault(_types3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buyer = exports.buyer = new _graphql.GraphQLObjectType({
    name: "buyer",
    description: 'buyer looking for a property listing',
    fields: function fields() {
        return {
            id: { type: _graphql.GraphQLID },
            firstName: {
                type: _graphql.GraphQLString,
                description: 'Buyer First Name'
            },
            lastname: {
                type: _graphql.GraphQLString,
                description: 'Buyer Last Name'
            },
            email: {
                type: _graphql.GraphQLString,
                description: 'Buyer email address'
            },
            phoneNumber: {
                type: _graphql.GraphQLString,
                description: 'Buyer phone number'
            },
            password: {
                type: _graphql.GraphQLString,
                description: 'Password'
            },
            googleID: {
                type: _graphql.GraphQLString,
                description: 'Google ID'
            },
            facebookID: {
                type: _graphql.GraphQLString,
                description: 'Facebook ID'
            },
            likedListings: {
                type: new _graphql.GraphQLList(_graphql.GraphQLString),
                description: 'A list of matched listings'
            },
            favoritedListings: {
                type: new _graphql.GraphQLList(_graphql.GraphQLString),
                description: 'A list of favorited matched listings'
            },
            preferences: {
                type: _types4.default,
                description: 'the preferences of the Buyer',
                resolve: function resolve(parent) {
                    return (0, _preferences.find)({ buyerID: parent.id });
                }
            },
            demographics: {
                type: _types2.default,
                description: 'the demographics of the Buyer',
                resolve: function resolve(parent) {
                    return (0, _demographics.find)({ buyerID: parent.id });
                }
            }
        };
    }
});