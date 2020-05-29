import React from "react";

const Person = ({ person , removePerson}) => (
  <div>
      <div>
        {person.name} {person.number}
        <button onClick={removePerson}>delete</button>
      </div>
  </div>
);

export default Person;
