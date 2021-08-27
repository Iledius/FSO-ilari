import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types";

import { Icon } from "semantic-ui-react";
import EntryComponent from "./Entry";
import axios from "axios";
import { apiBaseUrl } from "../../constants";
import EntryForm from "../EntryForm";
import { useStateValue } from "../../state";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  const [{ diagnoses }] = useStateValue();
  const diagnosisArray: Diagnosis[] = Object.entries(diagnoses).map(
    ([_s, d]: [s: string, d: Diagnosis]) => d
  );

  React.useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const fetchedPatient = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        setPatient(fetchedPatient.data);
      } catch (e) {
        console.error(e);
      }
    };

    if (!patient || patient?.id !== id) {
      void fetchPatientDetails();
    }
  }, [patient]);

  if (!patient) return <div>404: patient not found!</div>;

  let icon: "man" | "woman" | "genderless";

  switch (patient.gender) {
    case "male":
      icon = "man";
      break;
    case "female":
      icon = "woman";
      break;
    case "other":
      icon = "genderless";
      break;
    default:
      icon = "genderless";
  }

  return (
    <div>
      <h1>
        {patient.name} <Icon name={icon} />
      </h1>
      <p>ssn: {patient.ssn ? patient.ssn : "no access"}</p>
      <p>occupation: {patient.occupation}</p>
      <div>
        {patient.entries ? (
          patient.entries.map((e: Entry) => (
            <EntryComponent
              diagnoses={diagnosisArray}
              key={e.id}
              entry={e}
            ></EntryComponent>
          ))
        ) : (
          <div>no entries</div>
        )}
      </div>
      <EntryForm patientId={patient.id} diagnoses={diagnosisArray} />
    </div>
  );
};

export default PatientInfo;
