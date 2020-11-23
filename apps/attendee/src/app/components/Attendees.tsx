import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { useAttendees } from '../api/attendees';
import Auth from '../auth/Auth';
import { AttendeeItem } from '../models/AttendeeItem';
import { AttendeesList } from './AttendeesList';

interface AttendeesProps {
  auth: Auth;
}

export const Attendees: React.FunctionComponent<AttendeesProps> = ({
  auth,
}) => {
  const history = useHistory();
  const { id } = useParams();

  const { data, isLoading } = useAttendees(auth.getIdToken(), id);

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Attendees Overview</Header>
      <AttendeesList attendees={(data && data.items) || []} />
    </Segment>
  );
};
