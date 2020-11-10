import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { Header, Card, Loader, Segment, Button } from 'semantic-ui-react';

import { getAttendee } from '../api/attendees';
import Auth from '../auth/Auth';
import { AttendeeItem } from '../models/AttendeeItem';

interface AttendeeDetailsProps {
  auth: Auth;
}

interface AttendeeState {
  attendee: AttendeeItem;
  loading: boolean;
}

export const AttendeeDetails: React.FunctionComponent<AttendeeDetailsProps> = ({
  auth,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id, attendeeId } = useParams();

  const [attendeeState, setAttendeeState] = useState<AttendeeState>({
    attendee: null,
    loading: false,
  });

  const navigateBack = () => {
    history.push(`/events/${id}/attendees`);
  };

  const getAttendeeRequest = async (
    token: string,
    eventId: string,
    attendeeId: string
  ) => {
    try {
      setAttendeeState((prevState) => ({ ...prevState, loading: true }));
      const attendee = await getAttendee(token, eventId, attendeeId);
      setAttendeeState({ attendee, loading: false });
    } catch (e) {
      alert(`Failed to fetch attendee: ${e.message}`);
      setAttendeeState({ attendee: null, loading: false });
    }
  };

  useEffect(() => {
    const token = auth.getIdToken();
    getAttendeeRequest(token, id, attendeeId);
  }, []);

  return (
    <>
      <Segment>
        <Header size="medium">Attendee Details</Header>
        <Card
          header={
            (!attendeeState.loading &&
              attendeeState.attendee &&
              attendeeState.attendee.name) ||
            ''
          }
          meta={
            (!attendeeState.loading &&
              attendeeState.attendee &&
              attendeeState.attendee.email) ||
            ''
          }
          description={
            (!attendeeState.loading &&
              attendeeState.attendee &&
              '-') || (
              <Loader active inline="centered" />
            )
          }
        />
        <Button
          basic
          color="blue"
          size="medium"
          type="button"
          onClick={navigateBack}
        >
          Back
        </Button>
      </Segment>
    </>
  );
};
