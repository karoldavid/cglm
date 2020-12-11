import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, NavLink } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { useCreateAttendeePublic } from '../api/attendees';
import { CreateAttendeePublicRequest } from '../types/CreateAttendeePublicRequest';

interface PublicSignupFormProps {}

interface PublicSignupFormFields {
  name: string;
  email: string;
}

export const PublicSignupForm: React.FunctionComponent<PublicSignupFormProps> = () => {
  const { id } = useParams();

  const [mutate, { isLoading }] = useCreateAttendeePublic();

  const { register, handleSubmit } = useForm<PublicSignupFormFields>();

  const onSubmit = async (data: CreateAttendeePublicRequest) => {
    try {
      await mutate({ eventId: id, newAttendee: data });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Signup</Header>
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
          <Button basic color="grey" size="medium" as={NavLink} to="/">
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
