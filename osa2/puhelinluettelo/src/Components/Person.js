import React from "react";

const Person = ({ personsToShow = [] }) => (
  <div>
    {personsToShow.map((person) => (
      <div>
        {person.name} {person.number}
      </div>
    ))}
  </div>
);

export default Person;
