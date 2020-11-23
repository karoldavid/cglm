import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { useCreateAttendee } from '../api/attendees';
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

  const [mutate, { isLoading }] = useCreateAttendee(auth.getIdToken());

  const { register, handleSubmit } = useForm<AttendeeItem>();

  const onSubmit = async (data: CreateAttendeeRequest) => {
    try {
      await mutate({ eventId: id, newAttendee: data });
      history.push(`/events/${id}/attendees`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Add attendee</Header>
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
        <Button.Group>
          <Button
            basic
            color="grey"
            size="medium"
            as={NavLink}
            to={`/events/${id}/attendees`}
          >
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
