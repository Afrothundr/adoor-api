import { GraphQLString, GraphQLID, GraphQLList, GraphQLObjectType } from 'graphql';
import { listingType } from './listing/types';
const Listing = require('../../../models/seller/listing.model');

export const sellerType = new GraphQLObjectType({
    name: "seller",
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
        email: {
            type: GraphQLString,
            description: 'Seller email'
        },
        company: {
            type: GraphQLString,
            description: 'company name'
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