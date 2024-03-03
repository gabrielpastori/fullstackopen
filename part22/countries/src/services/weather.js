import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org';
const api_key = import.meta.env.VITE_SOME_KEY;

const getLatLong = async (city, country) => {
    const response = await axios.get(`${baseUrl}/geo/1.0/direct?q=${city},${country}&limit=1&appid=${api_key}`);
    return response.data[0]; 
};

const getCurrentWeather = async (city, country) => {
    const geoData = await getLatLong(city, country);
    if (!geoData) {
        throw new Error('Geolocation data not found');
    }
    const { lat, lon } = geoData;
    const response = await axios.get(`${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`);
    return response.data;
};

export default {
    getCurrentWeather
};
