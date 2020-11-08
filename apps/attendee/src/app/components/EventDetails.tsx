import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useRouteMatch, Switch } from 'react-router-dom';
import { Header, Card, Loader, Segment, Button } from 'semantic-ui-react';

import { getEvent } from '../api/events';
import Auth from '../auth/Auth';
import { EventItem } from '../models/EventItem';

import { ProtectedRoute } from './ProtectedRoute';
import { Attendees } from './Attendees';
import { EditAttendee } from './EditAttendee';
import { AttendeeForm } from './AttendeeForm';

interface EventDetailsProps {
  auth: Auth;
}

interface EventState {
  event: EventItem;
  loading: boolean;
}

export const EventDetails: React.FunctionComponent<EventDetailsProps> = ({
  auth,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id } = useParams();

  const [eventState, setEventState] = useState<EventState>({
    event: null,
    loading: false,
  });

  const navigateToNewAttendee = () => {
    history.push(`${match.url}/attendees/new`);
  };

  const getEventRequest = async (token: string, eventId: string) => {
    try {
      setEventState((prevState) => ({ ...prevState, loading: true }));
      const event = await getEvent(token, eventId);
      setEventState({ event, loading: false });
    } catch (e) {
      alert(`Failed to fetch event: ${e.message}`);
      setEventState({ event: null, loading: false });
    }
  };

  useEffect(() => {
    const token = auth.getIdToken();
    getEventRequest(token, id);
  }, []);

  return (
    <>
      <Segment>
        <Header size="medium">Event Details</Header>
        <Card
          header={
            (!eventState.loading &&
              eventState.event &&
              eventState.event.name) ||
            ''
          }
          meta={
            (!eventState.loading &&
              eventState.event &&
              eventState.event.eventDate) ||
            ''
          }
          description={
            (!eventState.loading &&
              eventState.event &&
              'Please add an event description.') || (
              <Loader active inline="centered" />
            )
          }
        />
        <Button
          size="medium"
          color="blue"
          type="button"
          onClick={navigateToNewAttendee}
        >
          Add Attendee
        </Button>
      </Segment>
      <Switch>
        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees"
          exact
          component={Attendees}
        />
        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees/new"
          exact
          component={AttendeeForm}
        />

        <ProtectedRoute
          auth={auth}
          path="/events/:id/attendees/:attendeeId/edit"
          exact={false}
          component={EditAttendee}
        />
      </Switch>
    </>
  );
};
