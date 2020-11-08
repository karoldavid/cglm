import React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import Auth from '../auth/Auth';
import { Redirect } from './Redirect';

interface ProtectedRouteProps extends RouteProps {
  auth: Auth;
  exact?: boolean;
  path: string;
}

interface ProtectedRouteComponentProps extends RouteComponentProps {
  auth: Auth;
}

export const ProtectedRoute: React.FunctionComponent<ProtectedRouteProps> = ({
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
      render={(props: ProtectedRouteComponentProps) =>
        auth.isAuthenticated() ? (
          <Component auth={auth} {...props} />
        ) : (
          <Redirect />
        )
      }
    />
  );
};
