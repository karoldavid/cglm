import React, { useState } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory, NavLink } from 'react-router-dom';

import { createEvent } from '../api/events';
import { CreateEventRequest } from '../types/CreateEventRequest';
import Auth from '../auth/Auth';

interface EventFormProps {
  auth: Auth;
}

type EventItem = {
  name: string;
  eventDate: string;
};

interface EventState {
  loading: boolean;
}

export const EventForm: React.FunctionComponent<EventFormProps> = ({
  auth,
}) => {
  const history = useHistory();
  const [eventState, setEventState] = useState<EventState>({
    loading: false,
  });
  const { register, handleSubmit } = useForm<EventItem>();

  const onSubmit = async (data: CreateEventRequest) => {
    const token = auth.getIdToken();
    try {
      setEventState({ loading: true });
      await createEvent(token, data);
      setEventState({ loading: false });

      history.push('/events');
    } catch (e) {
      setEventState({ loading: false });

      alert(`Failed to create event: ${e.message}`);
      history.push('/events');
    }
  };

  return (
    <Segment loading={eventState.loading}>
      <Header size="medium">Create a new event</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <input
            placeholder="Event Name"
            type="text"
            id="name"
            name="name"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Button.Group>
          <Button basic color="grey" size="medium" as={NavLink} to="/events">
            Cancel
          </Button>
          <Button basic color="blue" size="medium" type="submit">
            Save
          </Button>
        </Button.Group>
      </Form>
    </Segment>
  );
};
