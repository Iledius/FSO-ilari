import React, { useState } from 'react'

const Person = (props) =>{
  return(
    <div>
        {props.name} {props.number}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
      number: '040-1234567'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    const exists = 
    persons.filter(person=>person.name===newName)

    if(!exists.length)
      setPersons(persons.concat(personObject))
    else
      alert(`${newName} is already added to phonebook`)
    
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>number: <input value={newNumber}
         onChange={handleNumberChange}
         />
        </div>
        <div>
          
          <button type="submit">add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map(person =>
          <Person 
          key={person.name}
          name={person.name}
          number={person.number} />
        )}
     </div>
    </div>
  )
}

export default App