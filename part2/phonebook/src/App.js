import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , id: 1 }
  ]); 

  const [ newName, setNewName ] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name:newName,
      id:persons.length+2,
    };
    setPersons(persons.concat(nameObject));
    setNewName('');
  };

  const handleNameInput = (event) => setNewName(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( (person) => <div key={person.id}>{person.name}</div> ) }
    </div>
  )
}

export default App;
