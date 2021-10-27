import React from 'react';

const Filter = ({ onChange, term }) => {
    return (
        <div>
            find countries <input type="text" value={term} onChange={onChange} />
        </div>
    );
};

export default Filter;