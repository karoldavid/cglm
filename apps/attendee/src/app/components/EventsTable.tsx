import React, { useEffect } from 'react';
import { Table } from 'semantic-ui-react';
import { Event } from '../types/Event';

interface EventsTableProps {
  events: Event[];
}

export const EventsTable: React.FunctionComponent<EventsTableProps> = ({
  events,
}) => {
  const renderTableHeader = () => {
    return (
      <Table.Header>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Organizer</Table.HeaderCell>
      </Table.Header>
    );
  };

  const renderTableCells = (event: Event) => {
    return (
      <>
        <Table.Cell>{event.name}</Table.Cell>
        <Table.Cell>{event.eventDate}</Table.Cell>
        <Table.Cell>-</Table.Cell>
      </>
    );
  };

  const renderTableRows = (events: Event[]) => {
    return (
      <>
        {events.map((event) => (
          <Table.Row>{renderTableCells(event)}</Table.Row>
        ))}
      </>
    );
  };

  return (
    <Table attached>
      {renderTableHeader()}
      <Table.Body>{renderTableRows(events)}</Table.Body>
    </Table>
  );
};
