import React, { Suspense, useEffect } from 'react';
import { Grid, Header, Segment, Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import Auth from './auth/Auth';
import { Main } from './content/Main';
import { HeaderMenu } from './content/HeaderMenu';

export interface AppProps {
  auth: Auth;
}

export const App: React.FunctionComponent<AppProps> = ({ auth }) => {
  const { t } = useTranslation();

  return (
    <Suspense fallback="loading">
      <Container style={{ padding: '2em 0em' }}>
        <Segment style={{ padding: '1em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Header as="h1">{t('title')}</Header>
                <Header.Subheader>{t('subTitle')}</Header.Subheader>
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
    </Suspense>
  );
};
