import React from 'react';

const Country = ({ country }) => {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
        </div>
    );
}

export default Country;
