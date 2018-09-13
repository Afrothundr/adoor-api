import { listingInputType } from './types';
import { GraphQLID, GraphQLNonNull } from 'graphql';
const axios = require('axios');
import { listing } from './queries';
require('dotenv').config();

const Listing = require('../../../../models/seller/listing.model');
const Seller = require('../../../../models/seller/seller.model');

export const createListing = {
    type: require('../types').sellerType,
    args: {
        listing: { type: new GraphQLNonNull(listingInputType)}
    },
    resolve: async (_, {sellerID, listing}, { user }) => {
        const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${listing.address},+${listing.city},+MO&key=${process.env.googleMaps}`);
        console.log(location);
        const newListing = new Listing({
            sellerID: sellerID,
            pictures: listing.pictures,
            description: listing.description,
            address: listing.address,
            city: listing.city,
            zipcode: listing.zipcode,
            latitude: location.data.results[0].geometry.location.latitude,
            longitude: location.data.results[0].geometry.location.longitude,
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
        await newListing.save()
        return Seller.findByIdAndUpdate(user.id, {$push:{ listings: newListing }});
    }
}