import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { getAttendees } from '../api/attendees';
import Auth from '../auth/Auth';
import { AttendeeItem } from '../models/AttendeeItem';
import { AttendeesList } from './AttendeesList';

interface AttendeesProps {
  auth: Auth;
}

interface AttendeesState {
  attendees: AttendeeItem[];
  loading: boolean;
}

export const Attendees: React.FunctionComponent<AttendeesProps> = ({
  auth,
}) => {
  const history = useHistory();
  const { id } = useParams();

  const [attendeesState, setAttendeesState] = useState<AttendeesState>({
    attendees: [],
    loading: false,
  });

  const getAttendeesRequest = async (token: string, eventId: string) => {
    try {
      setAttendeesState((prevState) => ({ ...prevState, loading: true }));
      const attendees = await getAttendees(token, eventId);
      setAttendeesState({ attendees, loading: false });
    } catch (e) {
      alert(`Failed to fetch attendees: ${e.message}`);
      setAttendeesState({ attendees: [], loading: false });
    }
  };
  useEffect(() => {
    const token = auth.getIdToken();
    getAttendeesRequest(token, id);
  }, []);

  return (
    <Segment loading={attendeesState.loading}>
      <Header size="medium">Attendees Overview</Header>
      <AttendeesList attendees={attendeesState.attendees} />
    </Segment>
  );
};
