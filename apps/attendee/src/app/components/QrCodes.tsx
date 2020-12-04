import React from 'react';
import { useParams } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { useQrCodes } from '../api/qrCodes';
import Auth from '../auth/Auth';
import { QrCodesList } from './QrCodesList';

interface QrCodesProps {
  auth: Auth;
}
export const QrCodes: React.FunctionComponent<QrCodesProps> = ({ auth }) => {
  const { id } = useParams();

  const { data, isLoading } = useQrCodes(auth.getIdToken(), id);

  return (
    <Segment loading={isLoading}>
      <Header size="medium">QR-Codes Overview</Header>
      <QrCodesList qrCodes={(data && data.items) || []} />
    </Segment>
  );
};
