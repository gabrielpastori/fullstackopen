import React from 'react';
import Country from './Country';
import Flag from './Flag';
import Languages from './Languages';

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
            <div>
                <Country country={country} />
                <Languages country={country} />
                <Flag country={country} />
            </div>
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