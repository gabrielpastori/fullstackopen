import React from 'react';
import View from './View';

const Countries = ({ filteredCountries }) => {
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
            <View country={country}/>
        );
    }
    return (
        <div>
            {
                filteredCountries.map((country) =>
                    <div key={country.name.official}>
                        {country.name.common}
                    </div>
                )
            }
        </div>
    );
}

export default Countries;