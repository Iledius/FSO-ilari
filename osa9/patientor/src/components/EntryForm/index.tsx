import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { Diagnosis } from "../../types";
import HealthCheckEntryForm from "./HealthCheckEntry";
import HospitalEntryForm from "./HospitalEntry";
import OccupationalEntryForm from "./OccupationalEntry";
// Form for adding new entries
const EntryForm = ({
  diagnoses,
  patientId,
}: {
  diagnoses: Diagnosis[];
  patientId: string;
}) => {
  const [entryType, setEntryType] = useState<string>("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    if (name === "Type") {
      console.log(value);
      setEntryType(value);

      return;
    }
  };

  const CustomForm = () => {
    switch (entryType) {
      case "HealthCheck":
        return (
          <HealthCheckEntryForm diagnoses={diagnoses} patientId={patientId} />
        );
      case "Hospital":
        return (
          <HospitalEntryForm diagnoses={diagnoses} patientId={patientId} />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalEntryForm diagnoses={diagnoses} patientId={patientId} />
        );
      default:
        return <p>Please choose a value</p>;
    }
  };

  return (
    <div>
      <Form.Input
        name="Type"
        onChange={handleChange}
        label="Type"
        control="select"
      >
        <option value="Hospital" />
        <option value="HealthCheck" />
        <option value="OccupationalHealthcare" />
      </Form.Input>
      <CustomForm />
    </div>
  );
};

export default EntryForm;
