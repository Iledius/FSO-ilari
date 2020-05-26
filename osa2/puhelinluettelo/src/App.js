import React, { useState } from 'react'

const Person = (props) =>{
  return(
    <div>
        {props.name} {props.number}
    </div>
  )
}

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterName, setFilterName] = useState('')


  const personsToShow = persons.filter(person => person.name.includes(filterName))

  const addPerson = (event) =>{
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const exists = persons.filter(person=>person.name===newName)
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

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  return (
    <div>
        <h2>Phonebook</h2>
          <form onSubmit={addPerson}>
            <div>
              filter shown with <input value={filterName}
              onChange={handleFilterChange}/>
            </div>
            <div>
            <h2>add a new</h2>
              name: <input value={newName}
              onChange={handleNameChange}/>
            </div>
            
            <div>
              number: <input value={newNumber}
              onChange={handleNumberChange}/>
            </div>
            <div>
              <button type="submit">add
              </button>
            </div>
          </form>
          <h2>Numbers</h2>
          <div>
          {personsToShow.map(person =>
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