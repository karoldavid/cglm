import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Card, Image, Segment, Grid, Divider } from 'semantic-ui-react';

import { useQrCode } from '../api/qrCodes';
import Auth from '../auth/Auth';

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
                  Scan QR-Code to go to Event Attendee Form.
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>
                  Send Email with QR-Code and Signup Link
                </Card.Header>
                <Card.Meta>
                  <span className="email">zyskkd@gmail.com</span>
                </Card.Meta>
                <Card.Description>Send button</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
