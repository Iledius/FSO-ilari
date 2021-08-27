import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { Diagnosis, Entry } from "../../types";

const EntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  let icon: string;

  switch (entry.type) {
    case "Hospital":
      icon = "hospital";
      break;
    case "OccupationalHealthcare":
      icon = "user md";
      break;
    case "HealthCheck":
      icon = "calendar check outline";
      break;
    default:
      icon = "";
  }

  console.log(icon);

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon className={icon} />
            Date: {entry.date}
          </Table.HeaderCell>
          <Table.HeaderCell>Specialist: {entry.specialist}</Table.HeaderCell>
        </Table.Row>
        <Table.HeaderCell colSpan="3">{entry.description}</Table.HeaderCell>
      </Table.Header>

      <ul>
        {entry.diagnosisCodes?.map((d: string) => (
          <li key={d}>
            {`${d} `}
            {
              diagnoses.find((diagnosis: Diagnosis) => diagnosis.code === d)
                ?.name
            }
          </li>
        ))}
      </ul>
    </Table>
  );
};

export default EntryComponent;
