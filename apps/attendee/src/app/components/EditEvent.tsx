import React from 'react';

import Auth from '../auth/Auth';
import { EditEventForm } from './EditEventForm';

interface EditEventProps {
  auth: Auth;
}

export const EditEvent: React.FunctionComponent<EditEventProps> = ({
  auth,
}) => (
  <>
    <EditEventForm auth={auth} />
  </>
);
