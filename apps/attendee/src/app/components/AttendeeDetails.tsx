import React from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { useAttendee } from '../api/attendees';
import Auth from '../auth/Auth';
import { AttendeeDetailsCard } from './AttendeeDetailsCard';

interface AttendeeDetailsProps {
  auth: Auth;
}

export const AttendeeDetails: React.FunctionComponent<AttendeeDetailsProps> = ({
  auth,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id, attendeeId } = useParams();

  const { data, isLoading } = useAttendee(auth.getIdToken(), id, attendeeId);

  return (
    <>
      <Segment>
        <Header size="medium">Attendee Details</Header>
        <AttendeeDetailsCard data={data} loading={isLoading} />
      </Segment>
    </>
  );
};
