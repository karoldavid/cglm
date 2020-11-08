import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Button, List, Segment } from 'semantic-ui-react';
import { AttendeeItem } from '../models/AttendeeItem';

interface AttendeesListProps {
  attendees: AttendeeItem[];
}

export const AttendeesList: React.FunctionComponent<AttendeesListProps> = ({
  attendees,
}) => {
  const history = useHistory();
  const match = useRouteMatch();

  const navigateToAttendeeItem = (attendee: AttendeeItem) => {
    history.push(
      `${match.path}/${attendee.eventId}/${attendees}/${attendee.attendeeId}`
    );
  };

  const renderListItem = (attendee: AttendeeItem) => {
    return (
      <List.Item>
        <List.Content floated="right">
          <Button>Show</Button>
        </List.Content>
        <List.Content>{attendee.name}</List.Content>
      </List.Item>
    );
  };

  const renderListItems = (attendees: AttendeeItem[]) =>
    attendees.map((attendee) => renderListItem(attendee));

  return (
    <Segment>
      <List divided verticalAlign="middle">
        {renderListItems(attendees)}
      </List>
    </Segment>
  );
};
