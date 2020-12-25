import React from 'react';
import { useRouteMatch, useParams, NavLink } from 'react-router-dom';
import { List, Segment } from 'semantic-ui-react';
import { AttendeeItem } from '../models/AttendeeItem';

interface AttendeesListProps {
  attendees: AttendeeItem[];
}

export const AttendeesList: React.FunctionComponent<AttendeesListProps> = ({
  attendees,
}) => {
  const match = useRouteMatch();

  const renderListItem = (attendee: AttendeeItem) => {
    return (
      <List.Item key={attendee.attendeeId}>
        <List.Content floated="right">
          <NavLink to={`${match.url}/${attendee.attendeeId}`}>Show</NavLink>
        </List.Content>
        <List.Content>{attendee.name}</List.Content>
      </List.Item>
    );
  };

  const renderListItems = (attendees: AttendeeItem[]) =>
    attendees.map((attendee) => renderListItem(attendee));

  return (
    <>
      {!!attendees.length ? (
        <Segment>
          <List divided verticalAlign="middle">
            {renderListItems(attendees)}
          </List>
        </Segment>
      ) : null}
    </>
  );
};
