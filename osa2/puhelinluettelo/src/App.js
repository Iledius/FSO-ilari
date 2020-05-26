import React, { useState } from 'react'

const Person = (props) =>{
  return(
    <div>
        {props.name}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) =>{
    event.preventDefault()

    const personObject = {
      name: newName
    }
    const exists = 
    persons.filter(person=>person.name===newName)

    if(!exists.length)
      setPersons(persons.concat(personObject))
    else
      alert(`${newName} is already added to phonebook`)
    
    setNewName('')
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}
          onChange={handlePersonChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {persons.map(person =>
          <Person 
          key={person.name}
          name={person.name} />
        )}
     </div>
    </div>
  )
}

export default App