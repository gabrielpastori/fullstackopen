import React, { useState } from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , phone:'040-1234567' , id: 1 }
  ]); 

  const [ newName, setNewName ] = useState('');

  const [ newPhone, setNewPhone ] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    if(persons.some(person => person.name===newName )){
      alert(`${newName} is already added to phonebook`);
    }else{
      const nameObject = {
        name:newName,
        phone:newPhone,
        id:persons.length+2,
      };
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewPhone('');
    }
  };

  const handleNameInput = (event) => setNewName(event.target.value);

  const handlePhoneInput = (event) => setNewPhone(event.target.value);
  return (
    <div>
      <h2>Phonebook</h2>
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
      {persons.map( (person) => <div key={person.id}>{person.name} {person.phone}</div> ) }
    </div>
  )
}

export default App;
