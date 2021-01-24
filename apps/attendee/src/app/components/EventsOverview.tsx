import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { useEvents } from '../api/events';
import Auth from '../auth/Auth';
import { EventsTable } from './EventsTable';

interface EventsProps {
  auth: Auth;
  image?: {
    imageId: string;
    bucketName: string;
  };
}

export const EventsOverview: React.FunctionComponent<EventsProps> = ({
  auth,
  image,
}) => {
  const history = useHistory();

  const { data, isLoading } = useEvents(auth.getIdToken());

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Events Overview</Header>
      <EventsTable events={data && data.items} auth={auth} image={image} />
    </Segment>
  );
};
