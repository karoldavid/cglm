import React from 'react';
import { useHistory, useRouteMatch, NavLink } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react';
import { EventItem } from '../models/EventItem';
import { useDeleteEvent } from '../api/events';
import Auth from '../auth/Auth';

interface EventsTableProps {
  auth: Auth;
  events: EventItem[];
}

export const EventsTable: React.FunctionComponent<EventsTableProps> = ({
  auth,
  events = [],
}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const [mutate] = useDeleteEvent(auth.getIdToken());

  const navigateToEventItem = (event: EventItem) => {
    history.push(`${match.path}/${event.eventId}/attendees`);
  };

  const deleteEvent = (eventId: string) => {
    mutate({ eventId });
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
          <Button.Group>
            <Button
              basic
              size="medium"
              style={{ borderRadius: 0 }}
              onClick={() => deleteEvent(event.eventId)}
            >
              Delete
            </Button>
          </Button.Group>
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
