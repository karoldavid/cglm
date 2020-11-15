import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Button } from 'semantic-ui-react';

import Auth from '../auth/Auth';

export interface AppMenuProps {
  auth: Auth;
}

export const AppMenu: React.FunctionComponent<AppMenuProps> = ({ auth }) => {
  const { pathname } = useLocation();
  const isAuthenticated = auth.isAuthenticated();

  const handleLogin = () => {
    auth.login();
  };

  const handleLogout = () => {
    auth.logout();
  };

  const logInLogOutButton = () => {
    if (isAuthenticated) {
      return (
        <Menu.Item name="logout" onClick={handleLogout}>
          <Button basic color="grey">
            Log Out
          </Button>
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item name="login" onClick={handleLogin}>
          <Button basic color="blue">
            Log In
          </Button>
        </Menu.Item>
      );
    }
  };

  return (
    <Menu>
      <Menu.Item name="now" active={isAuthenticated && pathname === '/'}>
        {isAuthenticated ? <Link to="/">Now</Link> : 'Now'}
      </Menu.Item>
      <Menu.Item
        name="events"
        active={isAuthenticated && pathname.startsWith('/events')}
      >
        {isAuthenticated ? <Link to="/events">Events</Link> : 'Events'}
      </Menu.Item>
      <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
    </Menu>
  );
};
