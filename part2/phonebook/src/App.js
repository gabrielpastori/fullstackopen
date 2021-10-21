import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);

  const [ newName, setNewName ] = useState('');

  const [ newPhone, setNewPhone ] = useState('');

  const [ newFilter, setNewFilter ] = useState('');
  
  const [personsToShow, setPersonsToShow ] = useState(persons);

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name===newName )){
      alert(`${newName} is already added to phonebook`);
    }else{
      const personObject = {
        name:newName,
        number:newPhone,
        id:persons.length+2,
      };

      setPersons(persons.concat(personObject));
      setPersonsToShow(persons.concat(personObject));
      setNewFilter('');
      setNewName('');
      setNewPhone('');
    }
  };

  const handleNameInput = (event) => setNewName(event.target.value);

  const handlePhoneInput = (event) => setNewPhone(event.target.value);

  const handleFilterInput = (event) => {
    const value = event.target.value.toLowerCase();
    const filter = persons.filter((person) => person.name.toLowerCase().includes(value) );
    setNewFilter(value);
    setPersonsToShow(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter valueFilter={newFilter} onChangeFilter={handleFilterInput}/>
      
      <h3>Add a new</h3>

      <PersonForm 
      onSubmitPerson={addPerson} valueName={newName} valueNumber={newPhone} onChangeName={handleNameInput} onChangeNumber={handlePhoneInput}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow}/>
    </div>
  );
};

export default App;
