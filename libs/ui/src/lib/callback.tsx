import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

export const Callback = () => (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
);

export default Callback