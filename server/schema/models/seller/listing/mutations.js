import { listingInputType } from './types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { listing } from './queries';
import { geocodeAddress } from './resolvers';
require('dotenv').config();

const Listing = require('../../../../models/seller/listing.model');
const Seller = require('../../../../models/seller/seller.model');

export const createListing = {
    type: require('../types').sellerType,
    args: {
        listing: { type: new GraphQLNonNull(listingInputType) }
    },
    resolve: async (_, { listing }, { user }) => {
        const location = await geocodeAddress(listing.address, listing.city);
        const newListing = new Listing({
            sellerID: user.id,
            pictures: listing.pictures,
            description: listing.description,
            address: listing.address,
            city: listing.city,
            zipcode: listing.zipcode,
            latitude: location.latitude,
            longitude: location.longitude,
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
        newListing.save()
        return Seller.findByIdAndUpdate(user.id, { $push: { listings: newListing } });
    }
}