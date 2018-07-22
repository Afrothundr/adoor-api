'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _graphql = require('graphql');

var _types = require('./models/buyer/types');

var Buyer = require('../models/buyer/buyer.model');

var RootQuery = new _graphql.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        buyer: {
            type: _types.buyer,
            args: {
                id: {
                    descriptiopn: 'ID of buyer',
                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                }
            },
            resolve: function resolve(args) {
                return Buyer.findById(args.id);
            }
        },
        buyers: {
            type: new _graphql.GraphQLList(_types.buyer),
            resolve: function resolve() {
                return Buyer.find({});
            }
        }
    }
});

var Mutation = new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createBuyer: {
            type: _types.buyer,
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
                    var buyer = new BuyerModelType({
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
    }
});

exports.default = new _graphql.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});