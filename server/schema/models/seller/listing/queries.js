import { GraphQLID, GraphQLList } from 'graphql';
const Listing = require('../../../../models/seller/listing.model');

const listing = {
    type: require('./types').listingType,
    args: { listingID: { type: GraphQLID } },
    resolve(parent, {listingID}, {user}) {
        if (!user) throw new Error('Not Authenticated!');
        return Listing.findById(listingID, (err, res) => {
            if (res.sellerID !== user.id)
                throw new Error('Unauthorized to access this listing');
        });
    }
}

const listings = {
    type: new GraphQLList(require('./types').listingType),
    resolve(_, args, { user }) {
        if (!user) throw new Error('Not Authenticated!');
        return Listing.find({sellerID: user.id});
    }
}

export const listingQueries = {
    listing: listing,
    listings: listings
}