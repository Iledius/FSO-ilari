import React, { useState, useEffect } from "react";
import Filter from "./Components/Filter";
import Person from "./Components/Person";
import PersonForm from "./Components/PersonForm";
import personService from "./Services/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const personsToShow = persons.filter((person) =>
    person.name.includes(filterName)
  );

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const exists = persons.filter((person) => person.name === newName);
    if (!exists.length) {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
      });
    } else {
      const replaceOld = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );
      if (replaceOld) {
        const oldPerson = exists[0];
        const changedPerson = { ...oldPerson, number: newNumber };
        personService
          .update(oldPerson.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== oldPerson.id ? person : returnedPerson
              )
            );
          });
      }
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const removePerson = (personObject) => {
    personService.remove(personObject).then((returnedPersons) => {
      setPersons(persons);
      personService.getAll().then((initialPersons) => {
        setPersons(initialPersons);
      });
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} setFilterName={setFilterName} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map((person) => (
        <Person
          key={person.id}
          person={person}
          removePerson={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
};

export default App;
