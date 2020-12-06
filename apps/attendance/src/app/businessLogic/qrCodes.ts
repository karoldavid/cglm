import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import QRCode from 'qrcode';
import TinyUrl from 'tinyurl';

import { QrCodeItem } from '../models/QrCodeItem';
import { createLogger } from '../utils/logger';
import { getUserId } from '../lambda/utils';
import { QrCodeAccess } from '../dataLayer/qrCodeAccess';

const logger = createLogger('qrCodes');

const PUBLIC_URL = process.env.IS_OFFLINE
  ? `https://${process.env.LOCAL_TUNNEL_SUB_DOMAIN}.loca.lt`
  : '';

const qrCodeAccess = new QrCodeAccess();

export async function getQrCodes(
  event: APIGatewayProxyEvent
): Promise<QrCodeItem[]> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;

  logger.info('Getting all qrCodes for an event.');

  return qrCodeAccess.getQrCodes(userId, eventId);
}

export async function getQrCode(
  event: APIGatewayProxyEvent
): Promise<QrCodeItem> {
  const { qrCodeId } = event.pathParameters;

  logger.info('Getting attendee for an event.');

  return qrCodeAccess.getQrCode(qrCodeId);
}

export async function createQrCode(
  event: APIGatewayProxyEvent
): Promise<QrCodeItem> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  const qrCodeId = uuid.v4();

  const url = `${PUBLIC_URL}/public/events/${eventId}/attendees/new?qrCodeId=${qrCodeId}`;

  const shortUrl = await TinyUrl.shorten(url);

  const base64 = await QRCode.toDataURL(shortUrl);

  return await qrCodeAccess.createQrCode({
    userId: userId,
    eventId: eventId,
    qrCodeId: qrCodeId,
    base64: base64,
    shortUrl: shortUrl,
    timestamp: new Date().toISOString(),
    expiration: 3600000,
  });
}
