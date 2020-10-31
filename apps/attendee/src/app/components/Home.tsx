import React from 'react';
import { Header } from 'semantic-ui-react';

interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = () => (
  <Header as="h2">Welcome!</Header>
);
