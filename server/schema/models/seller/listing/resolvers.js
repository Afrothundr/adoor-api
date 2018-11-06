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
    const results = await getNeighborhoodScores(listing);
    const neighborhoodScores = new Neighborhood ({
        listingID: listing.id,
        parksRank: calculateParksRank(results.parks.data.results.length) | 0,
        groceryRank: results.groceryStores.data.results.length | 0,
        hospitalRank: calculateHospitalRank(results.hospitals.data.results.length) | 0,
        crimeRank: calculateCrimeRank(results.crimes.data.length) | 0,
        schoolRank: calculateSchoolRank(parseFloat(results.graduationRates.data[0].value)) | 0
    });
    let savedNeighborhooodDocument;
    await neighborhoodScores.save().then(document => {
        savedNeighborhooodDocument = document;
    });
    return savedNeighborhooodDocument;
}

async function getNeighborhoodScores(listing) {
    return {
        parks: await axios.get(`${process.env.googleBaseURL}location=${listing.latitude},${listing.longitude}&radius=50000&types=park&key=${process.env.googleAPI}`),
        groceryStores: await axios.get(`${process.env.googleBaseURL}location=${listing.latitude},${listing.longitude}&radius=5000&types=supermarket&key=${process.env.googleAPI}`),
        hospitals: await axios.get(`${process.env.googleBaseURL}location=${listing.latitude},${listing.longitude}&radius=5000&types=hospital&key=${process.env.googleAPI}`),
        crimes: await axios.get(`${process.env.kcmoBaseURL}zip_code=${listing.zipcode}&$$app_token=${process.env.KCOpenData}`),
        graduationRates: await axios.get(`${process.env.openDataBaseURL}variable=percent_high_school_graduate_or_higher&id=8600000US${listing.zipcode}&$$app_token=${process.env.KCOpenData}`)
    };
}

function calculateParksRank(totalParks) {
    if (totalParks == NaN) return null;
    if (totalParks >= 27) return 5;
    if (totalParks >= 20 && totalParks < 27) return 4;
    if (totalParks >= 13 && totalParks < 20) return 3;
    if (totalParks >= 6 && totalParks < 13) return 2;
    if (totalParks < 6) return 1;
}

function calculateCrimeRank(totalCrime) {
    if (totalCrime == NaN) return null;
    if (totalCrime <= 1495) return 5;
    if (totalCrime > 1495 && totalCrime <= 2930) return 4;
    if (totalCrime > 2930 && totalCrime <= 4395) return 3;
    if (totalCrime > 4395 && totalCrime <= 5860) return 2;
    if (totalCrime > 5860) return 1;
}

function calculateSchoolRank(graduationRate) {
    if (graduationRate == NaN) return null;
    if (graduationRate >= 95) return 5;
    if (graduationRate >= 93.7 && graduationRate < 95) return 4;
    if (graduationRate >= 89 && graduationRate < 93.7) return 3;
    if (graduationRate >= 82.1 && graduationRate < 89) return 2;
    if (graduationRate < 82.1) return 1;
}

function calculateHospitalRank(numHospitals) {
    if (numHospitals == NaN) return null;
    if (numHospitals >= 25) return 5;
    if (numHospitals >= 20 && numHospitals < 25) return 4;
    if (numHospitals >= 15 && numHospitals < 20) return 3;
    if (numHospitals >= 10 && numHospitals < 15) return 2;
    if (numHospitals < 5) return 1;
}

function calculateGroceryRank(numGroceryStores) {
    if (numGroceryStores == NaN) return null;
    if (numGroceryStores >= 25) return 5;
    if (numGroceryStores >= 20 && numGroceryStores < 25) return 4;
    if (numGroceryStores >= 15 && numGroceryStores < 20) return 3;
    if (numGroceryStores >= 10 && numGroceryStores < 15) return 2;
    if (numGroceryStores < 5) return 1;
}

