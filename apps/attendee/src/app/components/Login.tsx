import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import Auth from '../auth/Auth';

interface LogInProps {
  auth: Auth;
}

interface LogInState {}

export const LogIn: React.FunctionComponent<LogInProps> = ({ auth }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== '/') {
      history.push('/');
    }
  }, []);

  const onLogin = () => {
    auth.login();
  };

  return (
    <>
      <p>Please log in</p>

      <Button onClick={onLogin} size="medium" color="blue">
        Log in
      </Button>
    </>
  );
};
