import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInputObjectType, GraphQLNonNull } from "graphql";
import { find } from '../../../models/buyer/demographics.model';
import { find as _find } from '../../../models/buyer/preferences.model';

export const buyerType = new GraphQLObjectType({
    name: "buyer",
    description: 'buyer looking for a property listing',
    fields: () => {
        const demographicsType = require('./demographics/types');
        const preferenceType = require('./preferences/types');
        return {
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
                type: preferenceType,
                description: 'the preferences of the Buyer',
                resolve(parent) {
                    return _find({ buyerID: parent.id });
                }
            },
            demographics: {
                type: demographicsType,
                description: 'the demographics of the Buyer',
                resolve(parent) {
                    return find({ buyerID: parent.id });
                }
            }
        }
    }
});

export const buyerInputType = new GraphQLInputObjectType({
    name: 'Buyer Input',
    description: 'Input buyer payload',
    fields: () => ({
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
        },
    })
});