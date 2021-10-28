import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = ({ country }) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        const api_key = process.env.REACT_APP_API_KEY;
        axios
            .get(`http://api.weatherstack.com/forecast?access_key=${api_key}&query=${country.capital}&units=m`)
            .then((response) => {
                setWeather(response.data.current);
            })
    }, [country.capital]);

    return (
        <div>
            <h2>Weather in {country.capital}</h2>
            <p><b>temperature:</b> {weather.temperature} Celsius</p>
            <img src={weather.weather_icons} alt={`current weather in ${country.capital}`}/>
            <p><b>Wind:</b> {weather.wind_speed} kmh direction {weather.wind_dir}</p>
        </div>
    );
}

export default Weather;