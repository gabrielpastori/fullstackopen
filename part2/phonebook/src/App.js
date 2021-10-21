import React, { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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
    console.log(filter)
    setNewFilter(value);
    setPersonsToShow(filter);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type="text" value={newFilter} onChange={handleFilterInput}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input type="text" value={newPhone} onChange={handlePhoneInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow.map( (person) => <div key={person.id}>{person.name} {person.number}</div> ) }
    </div>
  )
}

export default App;
