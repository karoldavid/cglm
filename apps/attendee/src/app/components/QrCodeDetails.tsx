import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useRouteMatch, Switch } from 'react-router-dom';
import { Header, Card, Image, Segment } from 'semantic-ui-react';

import { getQrCode } from '../api/qrCodes';
import Auth from '../auth/Auth';
import { QrCodeItem } from '../models/QrCodeItem';

interface QrCodeDetailsProps {
  auth: Auth;
}

interface QrCodeState {
  qrCode: QrCodeItem;
  loading: boolean;
}

export const QrCodeDetails: React.FunctionComponent<QrCodeDetailsProps> = ({
  auth,
}) => {
  const history = useHistory();
  const match = useRouteMatch();
  const { id, qrCodeId } = useParams();

  const [qrCodeState, setQrCodeState] = useState<QrCodeState>({
    qrCode: null,
    loading: false,
  });

  const getQrCodeRequest = async (
    token: string,
    eventId: string,
    qrCodeId: string
  ) => {
    try {
      const qrCode = await getQrCode(token, eventId, qrCodeId);

      setQrCodeState({ qrCode: qrCode, loading: false });
    } catch (e) {
      alert(`Failed to fetch qrCode: ${e.message}`);
      setQrCodeState({ qrCode: null, loading: false });
    }
  };

  useEffect(() => {
    setQrCodeState({ qrCode: null, loading: true });
  }, []);

  useEffect(() => {
    if (qrCodeState.loading) {
      const token = auth.getIdToken();
      getQrCodeRequest(token, id, qrCodeId);
    }
  }, [qrCodeState.loading]);

  return (
    <Segment>
      <Header size="medium">QR-Code</Header>

      <Card>
        <Image
          src={
            qrCodeState.loading || qrCodeState.qrCode === null
              ? ''
              : qrCodeState && qrCodeState.qrCode && qrCodeState.qrCode.base64
          }
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>QrCode</Card.Header>
          <Card.Meta>
            <span className="date">
              {qrCodeState.loading || qrCodeState.qrCode === null
                ? ''
                : qrCodeState &&
                  qrCodeState.qrCode &&
                  qrCodeState.qrCode.timestamp}
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
