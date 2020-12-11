import React from 'react';
import { Grid, Header, Segment, Container } from 'semantic-ui-react';

import Auth from './auth/Auth';
import { AppMenu } from './components/AppMenu';
import { Main } from './content/Main';
import { HeaderMenu } from './content/HeaderMenu'

export interface AppProps {
  auth: Auth;
}

export interface AppState {}

export const App: React.FunctionComponent<AppProps> = ({ auth }) => {
  return (
    <Container style={{ padding: '2em 0em' }}>
      <Segment style={{ padding: '1em 0em' }} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width={16}>
              <Header as="h1">Attendee</Header>
              <Header.Subheader>
                Contactless Guest List Manager
              </Header.Subheader>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <HeaderMenu auth={auth} />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={16}>
              <Main auth={auth} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};
