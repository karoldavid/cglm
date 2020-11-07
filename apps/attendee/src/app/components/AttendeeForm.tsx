import React, { useState } from 'react';
import { Button, Form, Dimmer, Loader, Header } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { createAttendee } from '../api/attendees';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import Auth from '../auth/Auth';

const eventId = 'b3726998-84cc-4ee0-9dae-0a66afd8bf79';

interface AttendeeFormProps {
  auth: Auth;
}

type AttendeeItem = {
  name: string;
  eventDate: string;
};

interface AttendeeState {
  loading: boolean;
}

export const AttendeeForm: React.FunctionComponent<AttendeeFormProps> = ({
  auth,
}) => {
  const history = useHistory();
  const [attendeeState, setAttendeeState] = useState<AttendeeState>({
    loading: false,
  });
  const { register, handleSubmit } = useForm<AttendeeItem>();

  const onSubmit = async (data: CreateAttendeeRequest) => {
    const token = auth.getIdToken();
    try {
      setAttendeeState({ loading: true });
      await createAttendee(token, eventId, data);
      setAttendeeState({ loading: false });

      history.push(`/events/${eventId}/attendees`);
    } catch (e) {
      setAttendeeState({ loading: false });

      alert(`Failed to create attendee: ${e.message}`);
      history.push(`/events/${eventId}/attendees`);
    }
  };

  return (
    <>
      <Header size="medium">Create a new event</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <input
            placeholder="Attendee Name"
            type="text"
            id="name"
            name="name"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="email"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Button size="medium" color="blue" type="submit">
          Save
        </Button>
      </Form>
      {attendeeState.loading && (
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
      )}
    </>
  );
};
