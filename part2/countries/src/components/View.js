import React from 'react';
import Country from './Country';
import Languages from './Languages';
import Flag from './Flag';

const View = ({ country }) => {
    return (
        <div>
            <Country country={country} />
            <Languages country={country} />
            <Flag country={country} />
        </div>
    );
}

export default View;