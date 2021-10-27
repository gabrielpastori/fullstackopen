import React from 'react';

const Flag = ({country}) => {
    return (
        <div>
            <img src={country.flags.png} alt={`${country.name.official} flag`} />
        </div>
    );
}

export default Flag;