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
        parks: scores.parks.data.results.length,
        groceryStores: scores.groceryStores.data.results.length,
        hospitals: scores.hospitals.data.results.length,
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

// listingID: Schema.Types.ObjectId,
// schoolChoice : Number,
// groceryStores : Number,
// hospitals : Number,
// crimeScore : Number,
// parks : Number    

// axios.get(`${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=park&key=${Keys.googleMaps}`)
// .then(res => {
//   lifestyle.parksCount += res.data.results.length;
//   axios.get(`${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=supermarket&key=${Keys.googleMaps}`)
//     .then(res => {
//       lifestyle.groceryStoresCount += res.data.results.length;
//       axios.get(`${proxy}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=6000&types=hospital&key=${Keys.googleMaps}`)
//         .then(res => {
//           lifestyle.hospitalsCount += res.data.results.length;
//           axios.get(`/api/crimedata/${listing.zipcode}`)
//             .then(res => {
//               lifestyle.crimesCount += res.data.length;
//               axios.get(`${proxy}https://api.greatschools.org/schools/nearby?key=${Keys.greatSchools}&state=MO&lat=${listing.latitude}&lon=${listing.longitude}`)
//                 .then(res => {
//                   lifestyle.schoolsCount += res.data.schools.school.length;
//                   saveCommunityData(lifestyle);
//                 })
//             })
//         })
//     })
// })