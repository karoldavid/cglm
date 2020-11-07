import React from 'react';
import { Table, Dimmer, Loader } from 'semantic-ui-react';
import { Event } from '../models/Event';

interface EventsTableProps {
  events: Event[];
  loading: boolean;
}

export const EventsTable: React.FunctionComponent<EventsTableProps> = ({
  events,
  loading,
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
          <Table.Row key={event.eventId}>{renderTableCells(event)}</Table.Row>
        ))}
      </>
    );
  };

  const renderTableContent = (events: Event[]) => {
    return (
      <>
        {renderTableHeader()}
        <Table.Body>{renderTableRows(events)}</Table.Body>
      </>
    );
  };

  return (
    <>
      <Table attached>{renderTableContent(events)}</Table>
      {loading && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
    </>
  );
};
