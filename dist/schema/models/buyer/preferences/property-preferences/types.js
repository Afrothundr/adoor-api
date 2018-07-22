"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.propertyPreference = undefined;

var _graphql = require("graphql");

var propertyPreference = exports.propertyPreference = new _graphql.GraphQLObjectType({
    name: "property-preference",
    description: 'The property prefrences for a buyer',
    fields: function fields() {
        return {
            price: {
                type: _graphql.GraphQLInt,
                description: 'The maximum price a buyer is willing to spend'
            },
            zipCode: {
                type: _graphql.GraphQLInt,
                description: 'The prefered zipcode for the buyer'
            },
            bathrooms: {
                type: _graphql.GraphQLInt,
                description: 'The amount of bathrooms required for the buyer'
            },
            bedrooms: {
                type: _graphql.GraphQLInt,
                description: 'The amount of bedrooms required for the buyer'
            },
            squareFootage: {
                type: _graphql.GraphQLInt,
                description: 'The minimum amount of square ootage required for the buyer'
            }
        };
    }
});