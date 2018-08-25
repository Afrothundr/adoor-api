import { GraphQLID } from 'graphql';

const Listing = require('../../../../models/seller/listing.model');
export const listing = {
    type: require('./types').listingType,
    args: { listingID: { type: GraphQLID } },
    resolve(parent, {listingID}) {
        return Listing.find({id: listingID}, (err, res) => {
            if (err) return err;
            return res;
        });
    }
}