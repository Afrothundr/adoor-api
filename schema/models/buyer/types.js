const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = require("graphql");

const PreferencesModel = require('../../../models/buyer/preferences.model');
const DemographicsModel = require('../../../models/buyer/demographics.model');
const demographics = require('./demographics/types');
const preferences = require('./preferences/types');

const buyer = new GraphQLObjectType({
    name: "buyer",
    description: 'buyer looking for a property listing',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString,
            description: 'Buyer First Name'
        },
        lastname: {
            type: GraphQLString,
            description: 'Buyer Last Name'
        },
        email: {
            type: GraphQLString,
            description: 'Buyer email address'
        },
        phoneNumber: {
            type: GraphQLString,
            description: 'Buyer phone number'
        },
        password: {
            type: GraphQLString,
            description: 'Password'
        },
        googleID: {
            type: GraphQLString,
            description: 'Google ID'
        },
        facebookID: {
            type: GraphQLString,
            description: 'Facebook ID'
        },
        likedListings: {
            type: new GraphQLList(GraphQLString),
            description: 'A list of matched listings'
        },
        favoritedListings: {
            type: new GraphQLList(GraphQLString),
            description: 'A list of favorited matched listings'
        },
        preferences: {
            type: preferences,
            description: 'the preferences of the Buyer',
            resolve(parent){
                return PreferencesModel.find({buyerID: parent.id});
            } 
        },
        demographics: {
            type: demographics,
            description: 'the demographics of the Buyer',
            resolve(parent){
                return DemographicsModel.find({buyerID: parent.id});
            } 
        }
    })
});

module.exports = { buyer };