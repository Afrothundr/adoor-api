"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.neighboorhoodPreference = undefined;

var _graphql = require("graphql");

var neighboorhoodPreference = exports.neighboorhoodPreference = new _graphql.GraphQLObjectType({
    name: "neighborhood-preference",
    description: 'The neighboorhood prefrences for a buyer',
    fields: function fields() {
        return {
            caresAboutSchoolChoice: {
                type: _graphql.GraphQLBoolean,
                description: 'Does the Buyer care about local school scores?'
            },
            caresAboutGroceryStores: {
                type: _graphql.GraphQLBoolean,
                description: 'Does the Buyer care about grocery store availability?'
            },
            caresAboutHospitals: {
                type: _graphql.GraphQLBoolean,
                description: 'Does the Buyer care about having Healthcare providers nearby?'
            },
            caresAboutCrimeScore: {
                type: _graphql.GraphQLBoolean,
                description: 'Does the Buyer care about the local crime rate?'
            },
            caresAboutParks: {
                type: _graphql.GraphQLBoolean,
                description: 'Does the Buyer care about parks and recreation availability?'
            }
        };
    }
});