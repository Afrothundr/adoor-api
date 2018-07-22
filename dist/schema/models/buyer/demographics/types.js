"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.demographics = undefined;

var _graphql = require("graphql");

var demographics = exports.demographics = new _graphql.GraphQLObjectType({
    name: "demographics",
    description: 'The demographics of the buyer',
    fields: function fields() {
        return {
            income: {
                type: _graphql.GraphQLInt,
                description: 'upper income of the Buyer'
            },
            kids: {
                type: _graphql.GraphQLInt,
                description: 'youngest age of kids'
            },
            ageRange: {
                type: _graphql.GraphQLInt,
                description: 'younger limit of age Range'
            },
            pets: {
                type: _graphql.GraphQLString,
                description: 'type of pet owned by Buyer'
            },
            gender: {
                type: _graphql.GraphQLString,
                description: 'The prefered gender identity of the Buyer'
            }
        };
    }
});