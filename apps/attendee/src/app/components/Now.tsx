import React from 'react';
import { Header, Segment } from 'semantic-ui-react';

interface NowProps {}

export const Now: React.FunctionComponent<NowProps> = () => (
  <Segment>
    <Header size="medium">Real Time Digital Sheets</Header>
  </Segment>
);
