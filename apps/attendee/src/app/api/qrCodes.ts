import Axios from 'axios';

import { apiEndpoint } from '../../config';
import { QrCodeItem } from '../models/QrCodeItem';

export async function getQrCodes(
  idToken: string,
  eventId: string
): Promise<QrCodeItem[]> {
  const response = await Axios.get(`${apiEndpoint}/events/${eventId}/qrcodes`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.items;
}

export async function getQrCode(
  idToken: string,
  eventId: string,
  qrCodeId: string
): Promise<QrCodeItem> {
  const response = await Axios.get(
    `${apiEndpoint}/events/${eventId}/qrcodes/${qrCodeId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}

export async function createQrCode(
  idToken: string,
  eventId: string
): Promise<QrCodeItem> {
  const response = await Axios.post(
    `${apiEndpoint}/events/${eventId}/qrcodes`,
    null,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}
