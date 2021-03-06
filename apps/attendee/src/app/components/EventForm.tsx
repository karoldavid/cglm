import React from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory, NavLink } from 'react-router-dom';

import { useCreateEvent } from '../api/events';
import { CreateEventRequest } from '../types/CreateEventRequest';
import Auth from '../auth/Auth';

interface EventFormProps {
  auth: Auth;
}

type EventItem = {
  name: string;
  eventDate: string;
};

export const EventForm: React.FunctionComponent<EventFormProps> = ({
  auth,
}) => {
  const history = useHistory();

  const [mutate, { isLoading }] = useCreateEvent(auth.getIdToken());

  const { register, handleSubmit, errors } = useForm<EventItem>();

  const onSubmit = async (data: CreateEventRequest) => {
    try {
      await mutate({ newEvent: data });
      history.push('/events');
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Create a new event</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <input
            placeholder="Event Name"
            type="text"
            id="name"
            name="name"
            ref={register({
              required: true,
              pattern: /^[a-zA-Z0-9]+$/i,
              minLength: 5,
              maxLength: 20,
            })}
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
      {errors.name && (
        <Message
          error
          content="Event name is required, can contain only letters and numbers and length must be > 5 < 20."
        />
      )}
      {errors.eventDate && <Message error content="Event date is required." />}
    </Segment>
  );
};
