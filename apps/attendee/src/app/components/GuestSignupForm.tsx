import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { useCreateAttendeeGuest } from '../api/attendees';
import { CreateAttendeeGuestRequest } from '../types/CreateAttendeeGuestRequest';
import Auth from '../auth/Auth';

interface GuestSignupFormProps {
  auth: Auth;
}

interface GuestSignupFormFields {
  name: string;
  email: string;
}

export const GuestSignupForm: React.FunctionComponent<GuestSignupFormProps> = ({
  auth,
}) => {
  const { id } = useParams();

  const qrCodeId = new URLSearchParams(window.location.search).get('qrCodeId');

  const [mutate, { isLoading }] = useCreateAttendeeGuest(auth.getIdToken());

  const { register, handleSubmit, reset } = useForm<GuestSignupFormFields>();

  const onSubmit = async (data: CreateAttendeeGuestRequest) => {
    try {
      await mutate({
        eventId: id,
        newAttendee: data,
        params: { qrCodeId },
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Signup for Event</Header>
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
          <Button basic color="grey" size="medium" onClick={() => reset()}>
            Reset
          </Button>
          <Button basic color="blue" size="medium" type="submit">
            Send
          </Button>
        </Button.Group>
      </Form>
    </Segment>
  );
};
