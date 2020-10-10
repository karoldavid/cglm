import React from 'react';
import 'semantic-ui-css/semantic.min.css'
import { Ui, UiProps } from './ui';

export default {
  component: Ui,
  title: 'Ui',
};

export const primary = () => {
  /* eslint-disable-next-line */
  const props: UiProps = {};

  return <Ui />;
};
