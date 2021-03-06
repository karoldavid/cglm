import React, { Suspense } from 'react';
import Auth from './auth/Auth';
import { Router, Route } from 'react-router-dom';
import { Callback } from '@cglm/ui';
import { createBrowserHistory as createHistory } from 'history';
import { App } from './App';

const history = createHistory();

const auth = new Auth(history);

const handleAuthentication = (props: any) => {
  const location = props.location;
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeAuthRouting = () => {
  return (
    <Router history={history}>
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return <Callback />;
        }}
      />
      <Route
        render={(props) => {
          return (
            <Suspense fallback="loading">
              <App {...props} auth={auth} />
            </Suspense>
          );
        }}
      />
    </Router>
  );
};
