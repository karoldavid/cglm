import React from 'react';

import Auth from '../auth/Auth';

interface EditAttendeeProps {
  auth: Auth;
}

export const EditAttendee: React.FunctionComponent<EditAttendeeProps> = ({
  auth,
}) => {
  return <h1>EditAttendee</h1>;
};
