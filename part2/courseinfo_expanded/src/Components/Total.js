import React from 'react';

const Total = ({ parts }) => {
    const sum = parts.reduce((psum, part) => psum + part.exercises, 0);
    return (
        <p>total of {sum} exercises</p>
    );
}

export default Total;