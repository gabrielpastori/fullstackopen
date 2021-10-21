import React from 'react';
import Person from './Person';

const Persons = ({personsToShow}) => {
    return (
        personsToShow.map( (person) => <Person key={person.id} name={person.name} number={person.number}/> ) 
    );
};

export default Persons;