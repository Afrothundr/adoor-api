const axios = require('axios');


const Neighborhood = require('../../../../models/seller/neighborhood.model');

require('dotenv').config();

export async function geocodeAddress(address, city) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+MO&key=${process.env.googleAPI}`;
    const response = await axios.get(url);
    return {
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng
    }
}

export async function saveNeighborhoodScores(listing) {
    const scores = await getNeighborhoodScores(listing);
    console.log(scores);
    const neighborhoodScores = new Neighborhood ({
        listingID: listing.id,
        parks: scores.parks.data.results.length | 0,
        groceryStores: scores.groceryStores.data.results.length | 0,
        hospitals: scores.hospitals.data.results.length | 0,
        crimeScore: scores.crimes.data.length | 0
        //schoolChoice: scores.schools.data.schools.school.length
    });
    let savedNeighborhooodDocument;
    await neighborhoodScores.save().then(document => {
        savedNeighborhooodDocument = document;
    });
    return savedNeighborhooodDocument;
}

async function getNeighborhoodScores(listing) {
    const parks = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=1000&types=park&key=${process.env.googleAPI}`);
    const groceryStores = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=1000&types=supermarket&key=${process.env.googleAPI}`);
    const hospitals = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${listing.latitude},${listing.longitude}&radius=1000&types=hospital&key=${process.env.googleAPI}`);
    const crimes = await axios.get(`https://data.kcmo.org/resource/wy8a-bydn.json?zip_code=${listing.zipcode}&$$app_token=${process.env.KCOpenData}`)
    //const schools = await axios.get(`https://api.greatschools.org/schools/nearby?key=${process.env.greatSchools}&state=MO&lat=${listing.latitude}&lon=${listing.longitude}`);
    const results = {
        parks: parks,
        groceryStores: groceryStores,
        hospitals: hospitals,
        crimes: crimes
        //schoolChoice: schools
    };
    return results
}