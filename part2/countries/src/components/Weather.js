import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    const countryName = country.name.common;
    const api_key = process.env.REACT_APP_API_KEY;

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/forecast?access_key=${api_key}&query=${countryName}&units=m`)
            .then((response) => {
                setWeather(response.data.current);
            })
    }, []);

    return (
        <div>
            <h2>Weather in {countryName}</h2>
            <p><b>temperature:</b> {weather.temperature} Celsius</p>
            <p><b>Wind:</b> {weather.wind_speed} kmh direction {weather.wind_dir}</p>
        </div>
    );
}

export default Weather;