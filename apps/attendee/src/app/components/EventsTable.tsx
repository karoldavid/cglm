import React from 'react';
import { useHistory, useRouteMatch, NavLink } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { EventItem } from '../models/EventItem';

interface EventsTableProps {
  events: EventItem[];
}

export const EventsTable: React.FunctionComponent<EventsTableProps> = ({
  events,
}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const navigateToEventItem = (event: EventItem) => {
    history.push(`${match.path}/${event.eventId}/attendees`);
  };

  const renderTableHeader = () => {
    return (
      <Table.Header>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Date</Table.HeaderCell>
        <Table.HeaderCell>Organizer</Table.HeaderCell>
        <Table.HeaderCell textAlign="right">
          <Button as={NavLink} basic color="blue" to="/events/new">
            New
          </Button>
        </Table.HeaderCell>
      </Table.Header>
    );
  };

  const renderTableCells = (event: EventItem) => {
    return (
      <>
        <Table.Cell>{event.name}</Table.Cell>
        <Table.Cell>{event.eventDate}</Table.Cell>
        <Table.Cell>-</Table.Cell>
        <Table.Cell textAlign="right">
          <NavLink to={`${match.path}/${event.eventId}/attendees`}>
            Show
          </NavLink>
        </Table.Cell>
      </>
    );
  };

  const renderTableRows = (events: EventItem[]) => {
    return (
      <>
        {events.map((event) => (
          <Table.Row key={event.eventId}>{renderTableCells(event)}</Table.Row>
        ))}
      </>
    );
  };

  const renderTableContent = (events: EventItem[]) => {
    return (
      <>
        {renderTableHeader()}
        <Table.Body>{renderTableRows(events)}</Table.Body>
      </>
    );
  };

  return <Table attached>{renderTableContent(events)}</Table>;
};
