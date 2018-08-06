import { GraphQLBoolean, GraphQLID, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { demographics } from './demographics/types';

const Demographics = require('../../../models/buyer/demographics.model');
const Preference = require('../../../models/buyer/preferences.model');
const PropertyPreferences = require('../../../models/buyer/property-preferences.model');
const NeighboorhoodPreferences = require('../../../models/buyer/neighborhood-preferences.model');

export const buyerType = new GraphQLObjectType({
    name: "buyer",
    description: 'buyer looking for a property listing',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString,
            description: 'Buyer First Name'
        },
        lastName: {
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
            type: preference,
            description: 'the preferences of the Buyer',
            resolve(parent) {
                return Preference.find({ buyerID: parent.id });
            }
        },
        demographics: {
            type: demographics,
            description: 'the demographics of the Buyer',
            resolve(parent) {
                return Demographics.find({ buyerID: parent.id });
            }
        }
    })
});


const preference = new GraphQLObjectType({
    name: "preferences",
    description: 'The prefrences for a buyer',
    fields: () => ({
        id: { type: GraphQLID },
        propertyPreference: {
            type: propertyPreference,
            description: 'Propery preferences for the Buyer',
            resolve(parent) {
                return PropertyPreferences.find({ preferencesID: parent.id });
            }
        },
        neighboorhoodPreference: {
            type: neighboorhoodPreference,
            description: 'Neighboorhood preferences for the Buyer',
            resolve(parent) {
                return NeighboorhoodPreferences.find({ preferencesID: parent.id });
            }
        }
    })
});

const neighboorhoodPreference = new GraphQLObjectType({
    name: "neighborhood_preference",
    description: 'The neighboorhood prefrences for a buyer',
    fields: () => ({
        caresAboutSchoolChoice: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about local school scores?'
        },
        caresAboutGroceryStores: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about grocery store availability?'
        },
        caresAboutHospitals: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about having Healthcare providers nearby?'
        },
        caresAboutCrimeScore: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about the local crime rate?'
        },
        caresAboutParks: {
            type: GraphQLBoolean,
            description: 'Does the Buyer care about parks and recreation availability?'
        }
    })
});

const propertyPreference = new GraphQLObjectType({
    name: "property_preference",
    description: 'The property prefrences for a buyer',
    fields: () => ({
        price: {
            type: GraphQLInt,
            description: 'The maximum price a buyer is willing to spend'
        },
        zipCode: {
            type: GraphQLInt,
            description: 'The prefered zipcode for the buyer'
        },
        bathrooms: {
            type: GraphQLInt,
            description: 'The amount of bathrooms required for the buyer'
        },
        bedrooms: {
            type: GraphQLInt,
            description: 'The amount of bedrooms required for the buyer'
        },
        squareFootage: {
            type: GraphQLInt,
            description: 'The minimum amount of square ootage required for the buyer'
        }
    })
});

export const buyerInputType = new GraphQLInputObjectType({
    name: 'BuyerCreateType',
    type: buyerType,
    fields: {
        firstName: {
            description: 'First Name',
            type: new GraphQLNonNull(GraphQLString)
        },
        lastName: {
            description: 'Last Name',
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            description: 'Email Address',
            type: new GraphQLNonNull(GraphQLString)
        },
        phoneNumber: {
            description: 'Phone Number',
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            description: 'password',
            type: new GraphQLNonNull(GraphQLString)
        },
        googleID: {
            description: 'Google OAuth Token',
            type: GraphQLString
        },
        facebookID: {
            description: 'Google OAuth Token',
            type: GraphQLString
        },
        likedListings: {
            description: 'List of matched listings',
            type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        },
        favoritedListings: {
            description: 'List of favorited listings',
            type: new GraphQLNonNull(new GraphQLList(GraphQLString))
        }
    }
});