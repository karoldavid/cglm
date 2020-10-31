import React from 'react';
import { Container, Header } from 'semantic-ui-react';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => (
  <Container style={{ padding: '5em 0em' }}>
    <Header as="h1">Welcome to attendee!</Header>
  </Container>
);
