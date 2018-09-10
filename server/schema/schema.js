import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { createBuyer, updateBuyer, buyerLogin } from './models/buyer/mutations';
import { buyer, buyers } from './models/buyer/queries';
import { preferences } from './models/buyer/preferences/queries';
import { demographics } from './models/buyer/demographics/queries';
import { seller, sellers } from './models/seller/queries';
import { listing } from './models/seller/listing/queries';
import { createSeller, updateSeller, sellerLogin } from './models/seller/mutations';
import { createListing } from './models/seller/listing/mutations';

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        buyer: buyer,
        buyers: buyers,

        preferences: preferences,
        demographics: demographics,

        seller: seller,
        sellers: sellers,

        listing: listing
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    fields: () => ({
        createBuyer: createBuyer,
        updateBuyer: updateBuyer,
        buyerLogin: buyerLogin,

        createSeller: createSeller,
        updateSeller: updateSeller,
        sellerLogin: sellerLogin,

        createListing: createListing
    })
});

export default new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
})