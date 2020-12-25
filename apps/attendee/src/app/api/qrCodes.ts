import { useQuery, useMutation, useQueryCache } from 'react-query';

import { apiEndpoint } from '../../config';
import { QrCodeItem } from '../models/QrCodeItem';

const QUERY_KEY = 'qrcodes';

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
  return useQuery<QrCodesData, Error>([QUERY_KEY, eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
  );
}

export function useQrCode(idToken: string, eventId: string, qrCodeId: string) {
  return useQuery<QrCodeData, Error>([QUERY_KEY, eventId, qrCodeId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes/${qrCodeId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      return res.json();
    })
  );
}

export function useCreateQrCode(idToken: string) {
  const queryCache = useQueryCache();
  return useMutation(({ eventId }: CreateQrCodeVariables) =>
    fetch(`${apiEndpoint}/events/${eventId}/qrcodes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      queryCache.invalidateQueries([QUERY_KEY]);
      return res.json();
    })
  );
}
