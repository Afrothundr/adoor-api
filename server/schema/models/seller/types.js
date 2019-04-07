import { GraphQLString, GraphQLID, GraphQLList, GraphQLObjectType, GraphQLInputObjectType } from 'graphql';
import { listingType } from './listing/types';
const Listing = require('../../../models/seller/listing.model');

export const sellerType = new GraphQLObjectType({
    name: "seller",
    description: 'base seller type',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString,
            description: 'Seller First Name'
        },
        lastName: {
            type: GraphQLString,
            description: 'Seller Last Name'
        },
        bio: {
            type: GraphQLString,
            description: 'Seller information'
        },
        phoneNumber: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString,
            description: 'Seller email'
        },
        company: {
            type: GraphQLString,
            description: 'company name'
        },
        title: {
            type: GraphQLString,
            description: 'company title'
        },
        googleID: {
            type: GraphQLString,
            description: 'Google ID'
        },
        facebookID: {
            type: GraphQLString,
            description: 'Facebook ID'
        },
        profilePicture: {
            type: GraphQLString,
            description: 'url of profile picture'
        },
        listings: {
            type: new GraphQLList(listingType),
            description: 'A list of property listings',
            resolve(parent) {
                return Listing.find({ sellerID: parent.id });
            }
        }
    })
});


export const sellerInputType = new GraphQLInputObjectType({
    name: 'SellerCreateType',
    type: sellerType,
    fields: {
        firstName: {
            type: GraphQLString,
            description: 'Seller First Name'
        },
        lastName: {
            type: GraphQLString,
            description: 'Seller Last Name'
        },
        bio: {
            type: GraphQLString,
            description: 'Seller information'
        },
        phoneNumber: {
            type: GraphQLString
        },
        title: {
            type: GraphQLString,
            description: 'company title'
        },
        password: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString,
            description: 'Seller email'
        },
        company: {
            type: GraphQLString,
            description: 'company name'
        },
        profilePicture: {
            type: GraphQLString,
            description: 'url of profile picture'
        },
    }
});

export const sellerReturnType = new GraphQLObjectType({
    name: "sellerReturnType",
    description: 'seller advertising property listings',
    fields: () => ({
        id: { type: GraphQLID },
        firstName: {
            type: GraphQLString,
            description: 'Seller First Name'
        },
        lastName: {
            type: GraphQLString,
            description: 'Seller Last Name'
        },
        bio: {
            type: GraphQLString,
            description: 'Seller information'
        },
        phoneNumber: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString,
            description: 'Seller email'
        },
        company: {
            type: GraphQLString,
            description: 'company name'
        },
        title: {
            type: GraphQLString,
            description: 'company title'
        },
        googleID: {
            type: GraphQLString,
            description: 'Google ID'
        },
        facebookID: {
            type: GraphQLString,
            description: 'Facebook ID'
        },
        profilePicture: {
            type: GraphQLString,
            description: 'url of profile picture'
        },
        listings: {
            type: new GraphQLList(listingType),
            description: 'A list of property listings',
            resolve(parent) {
                return Listing.find({ sellerID: parent.id });
            }
        }
    })
});