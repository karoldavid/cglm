import React from 'react';
import { Link, Router, useLocation } from 'react-router-dom';
import { Grid, Header, Menu, Segment, Container } from 'semantic-ui-react';

import Auth from './auth/Auth';
import { Content } from './Content';
import { userInfo } from 'os';

export interface AppProps {
  auth: Auth;
  history: any;
}

export interface AppState {}

export const App: React.FunctionComponent<AppProps> = ({ auth, history }) => {
  const { pathname } = useLocation();

  const handleLogin = () => {
    auth.login();
  };

  const handleLogout = () => {
    auth.logout();
  };

  const logInLogOutButton = () => {
    if (auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={handleLogout}>
          Log Out
        </Menu.Item>
      );
    } else {
      return (
        <Menu.Item name="login" onClick={handleLogin}>
          Log In
        </Menu.Item>
      );
    }
  };

  const generateMenu = () => {
    return (
      <Menu>
        <Menu.Item name="home" active={pathname === '/'}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item name="events" active={pathname === '/events'}>
          <Link to="/events">Events</Link>
        </Menu.Item>
        <Menu.Item name="newEvent" active={pathname === '/events/new'}>
          <Link to="/events/new">New Event</Link>
        </Menu.Item>
        <Menu.Menu position="right">{logInLogOutButton()}</Menu.Menu>
      </Menu>
    );
  };

  return (
    <Container style={{ padding: '2em 0em' }}>
      <Segment style={{ padding: '1em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h1">Attendee</Header>
              <Header.Subheader>
                Your Contactless Guest List Manager
              </Header.Subheader>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={16}>
              <Router history={history}>
                {generateMenu()}

                <Content auth={auth} />
              </Router>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};
