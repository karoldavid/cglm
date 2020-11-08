import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from './auth/Auth';

import { LogIn } from './components/Login';
import { NotFound } from './components/NotFound';
import { Home } from './components/Home';
import { Events } from './components/Events';
import { EventDetails } from './components/EventDetails';
import { EventForm } from './components/EventForm';

interface ContentProps {
  auth: Auth;
}

export const Content: React.FunctionComponent<ContentProps> = ({ auth }) => {
  if (!auth.isAuthenticated()) {
    return <LogIn auth={auth} />;
  }

  return (
    <Switch>
      <Route
        path="/"
        exact
        render={(props) => {
          return <Home {...props} />;
        }}
      />

      <Route
        path="/events"
        exact
        render={(props) => {
          return <Events {...props} auth={auth} />;
        }}
      />

      <Route
        path="/events/new"
        exact
        render={(props) => {
          return <EventForm {...props} auth={auth} />;
        }}
      />

      <Route
        path="/events/:id"
        render={(props) => {
          return <EventDetails {...props} auth={auth} />;
        }}
      />

      <Route component={NotFound} />
    </Switch>
  );
};
