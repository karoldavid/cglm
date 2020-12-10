import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams, NavLink } from 'react-router-dom';
import { Button, Form, Segment, Header } from 'semantic-ui-react';

import { useSendSignupEmail } from '../api/emails';
import { SendSignupEmailRequest } from '../types/SendSignupEmailRequest';
import Auth from '../auth/Auth';

interface SignupEmailFormProps {
  auth: Auth;
  url: string;
  qrcode: string;
}

type SignupFormFields = {
  email: string;
};

export const SignupEmailForm: React.FunctionComponent<SignupEmailFormProps> = ({
  auth,
  url,
  qrcode,
}) => {
  const history = useHistory();

  const { id } = useParams();

  const [mutate, { isLoading }] = useSendSignupEmail(auth.getIdToken());

  const { register, handleSubmit } = useForm<SignupFormFields>();

  const onSubmit = async (data: SignupFormFields) => {
    const { email: recipient } = data;
    const signupEmail = { recipient, qrcode, name: 'Attendee', url };
    try {
      await mutate({ signupEmail });
      history.push(`/events/${id}/qrcodes`);
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <Segment loading={isLoading}>
      <Header size="medium">Signup Email with QR-Code</Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Field>
          <input
            type="email"
            placeholder="attendee@email.com"
            id="email"
            name="email"
            ref={register({ required: true })}
          />
        </Form.Field>
        <Button basic color="blue" size="medium" type="submit">
          Send
        </Button>
      </Form>
    </Segment>
  );
};
