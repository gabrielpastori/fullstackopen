import { useEffect, useState } from 'react'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import personService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [alertColor, setAlertColor] = useState(null)
  const [filteredName, setFilteredName] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilteredName(event.target.value.toLowerCase())
  }

  const handlePhoneAdd = (event) => {
    event.preventDefault()
    const newPerson = { 
                        name: newName,
                        number: newNumber,
                      }
    if (persons.some(person => person.name === newName)) {
      const oldPerson = persons.filter(person => person.name === newName)[0]
      personService
        .update(oldPerson.id, newPerson)
        .then(updatedPerson => {
          setPersons(persons.map(p => updatedPerson.name === p.name ? updatedPerson : p))
          setMessage(`${oldPerson.name} number updated to ${updatedPerson.number}`)
          setAlertColor('green')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      return
    }
    personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setMessage(`Added ${newPerson.name}: ${newPerson.number}`)
        setAlertColor('green')
        setTimeout(() => {
          setMessage(null)
        }, 5000)

      })

  }

  const handleDelete = (event) => {
    const deletePerson = event.currentTarget
    if (!window.confirm(`Delete ${deletePerson.name} ?`)) {
      return
    }
    personService
      .deletePerson(deletePerson.id)
      .then(deletedPerson => {
        setPersons(persons.filter((person) => person.id !== deletedPerson))
      })
      .catch( () => {
        setMessage(`Information of ${deletePerson.name} has already been removed from server`)
        setAlertColor('red')
        console.log(deletePerson.id)
        console.log(persons.filter((person) => person.id != deletePerson.id))
        setPersons(persons.filter((person) => person.id != deletePerson.id))
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }
  const filteredPersons = persons.filter(
    (person) => person.name.toLowerCase().includes(filteredName)
  )
  return (  
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} alertColor={alertColor}/>
      <Filter 
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>

      <PersonForm
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        handlePhoneAdd={handlePhoneAdd}
      />
      <h2>Numbers</h2>
      
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App