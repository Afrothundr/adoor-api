import { GraphQLID } from 'graphql';

const Listing = require('../../../../models/seller/listing.model');
export const listing = {
    type: require('./types').listingType,
    args: { listingID: { type: GraphQLID } },
    resolve(parent, {listingID}) {
        return Listing.findById(listingID);
    }
}