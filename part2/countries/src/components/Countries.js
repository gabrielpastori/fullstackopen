import React from 'react';
import About from './About';

const Countries = ({ filteredCountries, setTerm, setFilteredCountries }) => {
    const numberOfCountries = filteredCountries.length;
    
    if (numberOfCountries > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        );
    }
    if (numberOfCountries === 1) {
        const country = filteredCountries[0];
        return (
            <About country={country}/>
        );
    }

    const handleButtonShow = (country) => {
        setTerm(country.name.common.toLowerCase());
        setFilteredCountries([country]);
    }
    
    return (
        <div>
            {
                filteredCountries.map((country) =>
                    <div key={country.name.official}>
                        {country.name.common}
                        <button type="button" onClick={() => handleButtonShow(country)}>Show</button>
                    </div>
                )
            }
        </div>
    );
}

export default Countries;