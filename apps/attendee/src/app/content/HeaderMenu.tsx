import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Auth from '../auth/Auth';

import { NotFound } from '../components/NotFound';
import { AppMenu } from '../components/AppMenu';

interface HeaderMenuProps {
  auth: Auth;
}

export const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = ({
  auth,
}) => (
  <Switch>
    <Route
      path="/"
      render={({ location }) =>
        location.pathname.startsWith('/public') ? null : <AppMenu auth={auth} />
      }
    />
    <Route component={NotFound} />
  </Switch>
);
