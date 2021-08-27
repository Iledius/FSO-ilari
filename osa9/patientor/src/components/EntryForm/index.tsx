import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { addEntry, useStateValue } from "../../state";
import { Diagnosis, Entry, EntryBase } from "../../types";
// Form for adding new entries
const EntryForm = ({
  diagnoses,
  patientId,
}: {
  diagnoses: Diagnosis[];
  patientId: string;
}) => {
  const [, dispatch] = useStateValue();
  const [
    { id = "placeholder", description, date, specialist, diagnosisCodes },
    setState,
  ] = useState<EntryBase>({
    id: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [],
  });

  const handleSubmit = () => {
    const date = new Date().toDateString();
    const newEntry: Entry = {
      id,
      description,
      date: date,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating: 0,
    };
    dispatch(addEntry(patientId, newEntry));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const state = { id, description, date, specialist, diagnosisCodes };
    console.log(name, value);

    setState({ ...state, [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          name="specialist"
          onChange={handleChange}
          label="Specialist name"
          control="input"
        />
        <Form.Input onChange={handleChange} label="Diagnosis" control="select">
          {diagnoses.map((diagnosis) => (
            <option value={diagnosis.code} key={diagnosis.code} />
          ))}
        </Form.Input>
      </Form.Group>

      <Form.Input
        name="description"
        onChange={handleChange}
        label="Description"
        control="textarea"
        rows="4"
      />
      <Form.Field control="button">Submit entry</Form.Field>
    </Form>
  );
};

export default EntryForm;
