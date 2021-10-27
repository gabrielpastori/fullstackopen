import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    const countryCapital = country.capital;
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/forecast?access_key=${api_key}&query=${countryCapital}&units=m`)
            .then((response) => {
                setWeather(response.data.current);
            })
    }, []);

    return (
        <div>
            <h2>Weather in {countryCapital}</h2>
            <p><b>temperature:</b> {weather.temperature} Celsius</p>
            <p><b>Wind:</b> {weather.wind_speed} kmh direction {weather.wind_dir}</p>
        </div>
    );
}

export default Weather;