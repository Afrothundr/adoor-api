const axios = require('axios');

export async function geocodeAddress(address, city) {
    const key = 'AIzaSyDXG3KNKIpG9gGlngdqIi_3lItJFjFUAW0';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+MO&key=${key}`;
    console.log(url);

    const response = await axios.get(url);
    console.log(response.data.results);

    return {
        latitude: response.data.results[0].geometry.location.lat,
        longitude: response.data.results[0].geometry.location.lng
    }
}