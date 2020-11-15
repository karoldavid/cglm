import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Header, Segment } from 'semantic-ui-react';

import { getQrCodes } from '../api/qrCodes';
import Auth from '../auth/Auth';
import { QrCodeItem } from '../models/QrCodeItem';
import { QrCodesList } from './QrCodesList';

interface QrCodesProps {
  auth: Auth;
}

interface QrCodesState {
  qrCodes: QrCodeItem[];
  loading: boolean;
}

export const QrCodes: React.FunctionComponent<QrCodesProps> = ({ auth }) => {
  const history = useHistory();
  const { id } = useParams();

  const [qrCodesState, setQrCodesState] = useState<QrCodesState>({
    qrCodes: [],
    loading: false,
  });

  const getQrCodesRequest = async (token: string, eventId: string) => {
    try {
      setQrCodesState((prevState) => ({ ...prevState, loading: true }));
      const qrCodes = await getQrCodes(token, eventId);
      setQrCodesState({ qrCodes: qrCodes, loading: false });
    } catch (e) {
      alert(`Failed to fetch qrCodes: ${e.message}`);
      setQrCodesState({ qrCodes: [], loading: false });
    }
  };
  useEffect(() => {
    const token = auth.getIdToken();
    getQrCodesRequest(token, id);
  }, []);

  return (
    <Segment loading={qrCodesState.loading}>
      <Header size="medium">QR-Codes Overview</Header>
      <QrCodesList qrCodes={qrCodesState.qrCodes} />
    </Segment>
  );
};
