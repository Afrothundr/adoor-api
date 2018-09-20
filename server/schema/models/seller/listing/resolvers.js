const axios = require('axios');
import { listing } from './queries';
import { async } from './resolvers';

const Neighborhood = require('../../../../models/seller/neighborhood.model');

require('dotenv').config();

export async function geocodeAddress(address, city) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+MO&key=${process.env.googleAPI}`;
    console.log(url);
    const response = await axios.get(url);
    return {
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng
    }
}

export async function saveNeighborhoodScores(listing) {
    const scores = await getNeighborhoodScores(listing);
    const neighborhoodScores = new Neighborhood ({
        listingID: listing.id,
        parks: scores.parks.data.results.length | 0,
        groceryStores: scores.groceryStores.data.results.length | 0,
        hospitals: scores.hospitals.data.results.length | 0,
        //schoolChoice: scores.schools.data.schools.school.length
    });
    let savedNeighborhooodDocument;
    await neighborhoodScores.save().then(document => {
        savedNeighborhooodDocument = document;
    });
    return savedNeighborhooodDocument;
}

async function getNeighborhoodScores(listing) {
    const parks = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=park&key=${process.env.googleAPI}`);
    const groceryStores = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=supermarket&key=${process.env.googleAPI}`);
    const hospitals = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=hospital&key=${process.env.googleAPI}`);
    //const schools = await axios.get(`https://api.greatschools.org/schools/nearby?key=${process.env.greatSchools}&state=MO&lat=${listing.latitude}&lon=${listing.longitude}`);
    const results = {
        parks: parks,
        groceryStores: groceryStores,
        hospitals: hospitals,
        //schoolChoice: schools
    };
    return results
}