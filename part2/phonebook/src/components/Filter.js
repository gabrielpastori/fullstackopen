import React from 'react';

const Filter = ({valueFilter,onChangeFilter}) => {
    return(
        <div>
            filter shown with <input type="text" value={valueFilter} onChange={onChangeFilter} />
        </div>
    );
};

export default Filter;