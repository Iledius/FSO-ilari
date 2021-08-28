import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { addEntry, useStateValue } from "../../state";
import { Diagnosis, HealthCheckEntry } from "../../types";
// Form for adding new entries
const HealthCheckEntryForm = ({
  diagnoses,
  patientId,
}: {
  diagnoses: Diagnosis[];
  patientId: string;
}) => {
  const [, dispatch] = useStateValue();
  const [
    {
      type,
      id = "placeholder",
      description,
      date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    },
    setState,
  ] = useState<HealthCheckEntry>({
    type: "HealthCheck",
    id: "",
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: [] as Array<Diagnosis["code"]>,
    healthCheckRating: 0,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.length || !specialist.length || !diagnosisCodes) {
      alert("Please fill in all fields");
      return;
    }

    const date = new Date().toDateString();
    const newEntry: HealthCheckEntry = {
      type,
      id,
      description,
      date: date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };

    dispatch(addEntry(patientId, newEntry));
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const state = {
      type,
      id,
      description,
      date: date,
      specialist,
      diagnosisCodes,
      healthCheckRating,
    };

    if (name === "diagnosis") {
      setState({ ...state, diagnosisCodes: [value] });
    }
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
        <Form.Input
          name="diagnosis"
          onChange={handleChange}
          label="Diagnosis"
          control="select"
        >
          {diagnoses.map((diagnosis) => (
            <option value={diagnosis.code} key={diagnosis.code} />
          ))}
        </Form.Input>
        <Form.Input
          name="HealthCheckRating"
          onChange={handleChange}
          label="HealthCheckRating"
          control="select"
        >
          <option value={0} />
          <option value={1} />
          <option value={2} />
          <option value={3} />
          <option value={4} />
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

export default HealthCheckEntryForm;
