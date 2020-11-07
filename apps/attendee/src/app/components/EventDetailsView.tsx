import React, { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { getEvents } from '../api/events';
import Auth from '../auth/Auth';
import { Event } from '../models/Event';
import { EventsTable } from './EventsTable';

interface EventsProps {
  auth: Auth;
}

interface EventsState {
  events: Event[];
  loading: boolean;
}

export const Events: React.FunctionComponent<EventsProps> = ({ auth }) => {
  const history = useHistory();

  const [eventsState, setEventsState] = useState<EventsState>({
    events: [],
    loading: false,
  });

  const getEventsRequest = async (token: string) => {
    try {
      setEventsState((prevState) => ({ ...prevState, loading: true }));
      const events = await getEvents(token);
      setEventsState({ events, loading: false });
    } catch (e) {
      alert(`Failed to fetch events: ${e.message}`);
      setEventsState({ events: [], loading: false });
    }
  };
  useEffect(() => {
    const token = auth.getIdToken();
    getEventsRequest(token);
  }, []);

  return (
    <>
      <Container style={{ padding: '5em 0em' }}>
        <Header size="medium">Events Overview</Header>
        <EventsTable
          events={eventsState.events}
          loading={eventsState.loading}
        />
      </Container>
    </>
  );
};
