import { GraphQLID, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { demographicsType } from './demographics/types';
import { preferenceType } from './preferences/types';
import { listingType } from '../seller/listing/types';


const Demographics = require('../../../models/buyer/demographics.model');
const Preference = require('../../../models/buyer/preferences.model');
const Listing = require('../../../models/seller/listing.model');

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
        preferences: {
            type: preferenceType,
            description: 'the preferences of the Buyer',
            resolve(parent) {
                return Preference.find({ buyerID: parent.id });
            }
        },
        demographics: {
            type: demographicsType,
            description: 'the demographics of the Buyer',
            resolve(parent) {
                return Demographics.find({ buyerID: parent.id });
            }
        },
        matches: {
            type: new GraphQLList(listingType),
            description: 'A list of matched listings',
            resolve(parent) {
                return Listing.find({_id: {$in: parent.matches}});
            }
        },
        favoriteMatches: {
            type: new GraphQLList(listingType),
            description: 'A list of favorited matched listings',
            resolve(parent) {
                return Listing.find({_id: {$in: parent.favoriteMatches}});
            }
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
        }
    }
});

export const buyerReturnType = new GraphQLObjectType({
    name: "buyerReturnType",
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
        googleID: {
            type: GraphQLString,
            description: 'Google ID'
        },
        facebookID: {
            type: GraphQLString,
            description: 'Facebook ID'
        },
        preferences: {
            type: preferenceType,
            description: 'the preferences of the Buyer',
            resolve(parent) {
                return Preference.find({ buyerID: parent.id });
            }
        },
        demographics: {
            type: demographicsType,
            description: 'the demographics of the Buyer',
            resolve(parent) {
                return Demographics.find({ buyerID: parent.id });
            }
        },
        matches: {
            type: new GraphQLList(listingType),
            description: 'A list of matched listings',
            resolve(parent) {
                return Listing.find({_id: {$in: parent.matches}});
            }
        },
        favoriteMatches: {
            type: new GraphQLList(listingType),
            description: 'A list of favorited matched listings',
            resolve(parent) {
                return Listing.find({_id: {$in: parent.favoriteMatches}});
            }
        }
    })
});