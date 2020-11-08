import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './auth/Auth';

import { NotFound } from './components/NotFound';
import { Now } from './components/Now';
import { Events } from './components/Events';
import { EventDetails } from './components/EventDetails';
import { EventForm } from './components/EventForm';
import { ProtectedRoute } from './components/ProtectedRoute';

interface ContentProps {
  auth: Auth;
}

export const Content: React.FunctionComponent<ContentProps> = ({ auth }) => {
  return (
    <Switch>
      <ProtectedRoute auth={auth} path="/" exact component={Now} />
      <ProtectedRoute auth={auth} path="/events" exact component={Events} />
      <ProtectedRoute
        auth={auth}
        path="/events/new"
        exact
        component={EventForm}
      />
      <ProtectedRoute
        auth={auth}
        path="/events/:id"
        exact={false}
        component={EventDetails}
      />
      <Route component={NotFound} />
    </Switch>
  );
};
