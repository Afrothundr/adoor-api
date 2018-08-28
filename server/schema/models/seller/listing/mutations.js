import { listingInputType } from './types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

const Listing = require('../../../../models/seller/listing.model');
const Seller = require('../../../../models/seller/seller.model');

export const createListing = {
    type: require('./types').listingType,
    args: {
        sellerID: { type: new GraphQLNonNull(GraphQLID) },
        listing: { type: new GraphQLNonNull(listingInputType)}
    },
    resolve: (parent, {sellerID, listing}) => {
        const newListing = new Listing({
            sellerID: Seller.findById(sellerID),
            pictures: listing.pictures,
            description: listing.description,
            address: listing.address,
            city: listing.city,
            zipcode: listing.zipcode,
            bedrooms: listing.bedrooms,
            bathrooms: listing.bathrooms,
            squareFootage: listing.squareFootage,
            price: listing.price,
            priceHistory: listing.priceHistory,
            updated: [Date().toString],
            views: 0,
            yearBuilt: listing.yearBuilt,
            renovatedYear: listing.renovatedYear,
            heating: listing.heating,
            cooling: listing.cooling,
            kitchenType: listing.kitchenType,
            laundry: listing.laundry,
            fireplace: listing.fireplace,
            // TODO: add 3rd party api calls to figure out neighboorhood and outdoor features
        });
        return newListing.save();
    }
}