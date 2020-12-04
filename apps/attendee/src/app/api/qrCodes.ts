import { useQuery, useMutation } from 'react-query';

import { apiEndpoint } from '../../config';
import { QrCodeItem } from '../models/QrCodeItem';

interface QrCodesData {
  items: QrCodeItem[];
}

interface QrCodeData {
  item: QrCodeItem;
}

interface CreateQrCodeVariables {
  eventId: string;
}

export function useQrCodes(idToken: string, eventId: string) {
  return useQuery<QrCodesData, Error>(['list-qrcodes', eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}

export function useQrCode(idToken: string, eventId: string, qrCodeId: string) {
  return useQuery<QrCodeData, Error>(['list-qrcodes', eventId, qrCodeId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes/${qrCodeId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}

export function useCreateQrCode(idToken: string) {
  return useMutation(({ eventId }: CreateQrCodeVariables) =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}
