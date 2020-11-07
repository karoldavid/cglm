import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Segment } from 'semantic-ui-react';
import Auth from '../auth/Auth';

interface LogInProps {
  auth: Auth;
}

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
      <Segment>Please log in</Segment>

      <Button onClick={onLogin} size="medium" color="blue">
        Log in
      </Button>
    </>
  );
};
