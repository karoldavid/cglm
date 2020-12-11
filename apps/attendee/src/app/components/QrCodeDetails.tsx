import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Header,
  Card,
  Image,
  Segment,
  Grid,
  Divider,
  Loader,
} from 'semantic-ui-react';

import { useQrCode } from '../api/qrCodes';
import Auth from '../auth/Auth';
import { SignupEmailForm } from '../components/SignupEmailForm';

interface QrCodeDetailsProps {
  auth: Auth;
}

export const QrCodeDetails: React.FunctionComponent<QrCodeDetailsProps> = ({
  auth,
}) => {
  const { id, qrCodeId } = useParams();

  const { data, isLoading, isError } = useQrCode(
    auth.getIdToken(),
    id,
    qrCodeId
  );

  return (
    <Segment>
      <Header size="medium">QR-Code</Header>
      <Grid columns={2} stackable>
        <Divider vertical />
        <Grid.Row>
          <Grid.Column>
            {isLoading ? (
              <Loader active inline="centered" />
            ) : (
              <Card>
                <Image
                  src={isLoading || isError ? '' : data.item.base64}
                  wrapped
                  ui={false}
                />
                <Card.Content>
                  <Card.Header>
                    {isLoading ? 'Loading QR-Code' : 'Timestamp'}
                  </Card.Header>
                  <Card.Meta>
                    <span className="date">
                      {isLoading || isError ? '' : data.item.timestamp}
                    </span>
                  </Card.Meta>
                  <Card.Description>
                    <p>Scan QR-Code to go to Attendee Signup Form.</p>
                    Link:{' '}
                    {isLoading || isError ? (
                      ''
                    ) : (
                      <a href={data.item.shortUrl} target={'_blank'}>
                        {data.item.shortUrl}
                      </a>
                    )}
                  </Card.Description>
                </Card.Content>
              </Card>
            )}
          </Grid.Column>

          <Grid.Column>
            {isLoading ? (
              <Loader active inline="centered" />
            ) : (
              <Card>
                <SignupEmailForm
                  auth={auth}
                  qrcode={isLoading || isError ? '' : data.item.base64}
                  url={isLoading || isError ? '' : data.item.url}
                />
              </Card>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
