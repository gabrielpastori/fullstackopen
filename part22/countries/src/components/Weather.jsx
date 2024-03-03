import weatherService from '../services/weather.js'
import { useState, useEffect } from 'react'

const Weather = ( { country } ) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        weatherService
            .getCurrentWeather(country.capital[0], country.cca2)
            .then(data => {
                setWeatherData(data)
            })

    }, [country])
    console.log('weather: ', weatherData)
    return (
        <div>
            {weatherData? (
                <>
                    <h2>Weather in {country.capital[0]} - {country.cca2}</h2>
                    <p>temperature: {weatherData.main.temp} Celsius</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
                    <p>wind {weatherData.wind.speed} m/s</p>
                </>
            ) : (
                <div>Loading weather data</div>
            )}
        </div>
    )
}

export default Weather;