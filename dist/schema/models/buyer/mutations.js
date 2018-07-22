'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _types = require('./types');

var _types2 = _interopRequireDefault(_types);

var _buyer = require('../../../models/buyer/buyer.model');

var _buyer2 = _interopRequireDefault(_buyer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Buyer) {
    return {
        createBuyer: {
            type: _types2.default,
            args: {
                firstName: {
                    description: 'First Name',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                },
                lastName: {
                    description: 'Last Name',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                },
                email: {
                    description: 'Email Address',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                },
                phoneNumber: {
                    description: 'Phone Number',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                },
                password: {
                    description: 'password',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                },
                googleID: {
                    description: 'Google OAuth Token',
                    type: _graphql.GraphQLString
                },
                facebookID: {
                    description: 'Google OAuth Token',
                    type: _graphql.GraphQLString
                },
                likedListings: {
                    description: 'List of matched listings',
                    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(_graphql.GraphQLString))
                },
                favoritedListings: {
                    description: 'List of favorited listings',
                    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLList(_graphql.GraphQLString))
                },
                resolve: function resolve(args) {
                    var buyer = new _buyer2.default({
                        firstName: args.firstName,
                        lastName: args.lastName,
                        email: args.email,
                        phoneNumber: args.phoneNumber,
                        password: args.password,
                        googleID: args.googleID,
                        facebookID: args.facebookID,
                        likedListings: args.likedListings,
                        favoritedListings: args.favoritedListings
                    });
                    return buyer.save();
                }
            }
        }
    };
};