import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Card, Image, Segment } from 'semantic-ui-react';

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

      <Card>
        <Image
          src={isLoading || isError ? '' : data.item.base64}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>QrCode</Card.Header>
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
    </Segment>
  );
};
