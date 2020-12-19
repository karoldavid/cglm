import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import Auth from '../auth/Auth';
import { Redirect } from './Redirect';

interface ProtectedGuestRouteProps extends RouteProps {
  auth: Auth;
  exact?: boolean;
  path: string;
}

interface ProtectedGuestRouteComponentProps extends RouteComponentProps {
  auth: Auth;
}

export const ProtectedGuestRoute: React.FunctionComponent<ProtectedGuestRouteProps> = ({
  auth,
  component: Component,
  exact,
  path,
  ...otherProps
}) => {
  if (!Component) {
    return null;
  }

  return (
    <Route
      {...otherProps}
      render={(props: ProtectedGuestRouteComponentProps) =>
        auth.isAuthenticated() ? (
          <Component auth={auth} {...props} />
        ) : (
          <Redirect />
        )
      }
    />
  );
};
