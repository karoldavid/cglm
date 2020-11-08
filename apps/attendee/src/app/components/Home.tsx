import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => (
  <Segment>
    <Header size="medium">Your Digital Sheets</Header>
  </Segment>
);
