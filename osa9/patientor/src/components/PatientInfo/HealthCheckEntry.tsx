import React from "react";
import { Icon, Table } from "semantic-ui-react";
import { Entry } from "../../types";

const Entry = (entry: Entry) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Icon className={"calendar check outline"} />
          Date: {entry.date}
        </Table.HeaderCell>
        <Table.HeaderCell>Specialist: {entry.specialist}</Table.HeaderCell>
      </Table.Row>
      <Table.HeaderCell colSpan="3">{entry.description}</Table.HeaderCell>
    </Table.Header>
  </Table>
);

export default Entry;
