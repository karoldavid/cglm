import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { createAttendee } from '../api/attendees';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import Auth from '../auth/Auth';

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

  const { id } = useParams();

  const [attendeeState, setAttendeeState] = useState<AttendeeState>({
    loading: false,
  });
  const { register, handleSubmit } = useForm<AttendeeItem>();

  const onSubmit = async (data: CreateAttendeeRequest) => {
    const token = auth.getIdToken();
    try {
      setAttendeeState({ loading: true });
      await createAttendee(token, id, data);
      setAttendeeState({ loading: false });

      history.push(`/events/${id}`);
    } catch (e) {
      setAttendeeState({ loading: false });

      alert(`Failed to create attendee: ${e.message}`);
      history.push(`/events/${id}`);
    }
  };

  return (
    <Segment loading={attendeeState.loading}>
      <Header size="medium">Add an attendee to the event</Header>
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
    </Segment>
  );
};
