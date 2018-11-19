import { listingInputType } from './types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { listing } from './queries';
import { geocodeAddress, saveNeighborhoodScores } from './resolvers';
require('dotenv').config();

const Listing = require('../../../../models/seller/listing.model');
const Seller = require('../../../../models/seller/seller.model');

const createListing = {
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
            neighborhood: null,
        });
        await newListing.save().then( async (document) => {
          const savedListing = document;
          const neighborhoodDocument = await saveNeighborhoodScores(savedListing);
          Listing.findByIdAndUpdate(savedListing._id, {$set: {neighborhood: neighborhoodDocument._id}});
        });
        return Seller.findByIdAndUpdate(user.id, { $push: { listings: newListing } });
    }
}

export const listingMutations = {
    createListing: createListing
}