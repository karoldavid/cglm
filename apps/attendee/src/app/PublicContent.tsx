import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { AttendeeForm } from './components/AttendeeForm';

interface PublicContentProps {}

export const PublicContent: React.FunctionComponent<PublicContentProps> = () => {
  return (
    <Switch>
      <Route
        path={`/public/events/:id/attendees/new`}
        exact
        component={AttendeeForm}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
