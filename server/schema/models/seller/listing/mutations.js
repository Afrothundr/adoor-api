import { listingInputType, listingUpdateInputType } from './types';
import { GraphQLID, GraphQLNonNull } from 'graphql';

import { listing } from './queries';
import { geocodeAddress, saveNeighborhoodScores } from './resolvers';
import { GraphQLString } from 'graphql';
require('dotenv').config();

const Listing = require('../../../../models/seller/listing.model');
const Seller = require('../../../../models/seller/seller.model');
const Neighborhood = require('../../../../models/seller/neighborhood.model');

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
            priceHistory: [listing.price],
            created: new Date(),
            updated: new Date(),
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
        await newListing.save().then(async (document) => {
            const savedListing = document;
            const neighborhoodDocument = await saveNeighborhoodScores(savedListing);
            Listing.findByIdAndUpdate(savedListing._id, { $set: { neighborhood: neighborhoodDocument._id } });
        });
        return Seller.findByIdAndUpdate(user.id, { $push: { listings: newListing } });
    }
}

const updateListing = {
    type: require('./types.js').listingType,
    args: {
        listingId: { type: new GraphQLNonNull(GraphQLID) },
        listingUpdate: { type: new GraphQLNonNull(listingUpdateInputType) }
    },
    resolve: async (_, { listingId, listingUpdate }, { user }) => {
        const update = {
            ...listingUpdate,
            updated: new Date()
        }
        return Listing
            .findByIdAndUpdate(listingId,
                {
                    $set: { ...update },
                    $push: { priceHistory: listingUpdate.price }
                }, { new: true });
    }
}


const deleteListing = {
    type: GraphQLString,
    args: {
        listingID: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_, { listingID }, { user }) => {
        await Neighborhood.deleteMany({ listingID: listingID });
        await Listing.findByIdAndDelete(listingID);
        return 'Listing deleted!';
    }
}

export const listingMutations = {
    createListing: createListing,
    updateListing: updateListing,
    deleteListing: deleteListing
}