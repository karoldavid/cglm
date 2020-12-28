import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import QRCode from 'qrcode';
import TinyUrl from 'tinyurl';

import { QrCodeItem } from '../models/QrCodeItem';
import { createLogger } from '../utils/logger';
import { getUserId } from '../lambda/utils';
import { QrCodeAccess } from '../dataLayer/qrCodeAccess';

const logger = createLogger('qrCodes');

const ATTENDEE_URL =
  process.env.NODE_ENV === 'development'
    ? `https://${process.env.LOCAL_TUNNEL_SUB_DOMAIN}.loca.lt`
    : process.env.ATTENDEE_URL;

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

  logger.info('Getting QR-Code.');

  return qrCodeAccess.getQrCode(qrCodeId);
}
export async function getQrCodeById(qrCodeId: string): Promise<QrCodeItem> {
  logger.info('Getting QR-Code by id.');

  return qrCodeAccess.getQrCode(qrCodeId);
}

export async function createQrCode(
  event: APIGatewayProxyEvent
): Promise<QrCodeItem> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  const qrCodeId = uuid.v4();

  const url = `${ATTENDEE_URL}/guest/events/${eventId}/attendees?qrCodeId=${qrCodeId}`;

  const shortUrl = await TinyUrl.shorten(url);

  const base64 = await QRCode.toDataURL(shortUrl);

  return await qrCodeAccess.createQrCode({
    userId: userId,
    eventId: eventId,
    qrCodeId: qrCodeId,
    base64: base64,
    shortUrl: shortUrl,
    timestamp: new Date().toISOString(),
    expiration: Math.round(new Date().getTime() / 1000) + 360,
  });
}

console.log(process.env.NX_TEST);

export async function qrCodeIsValid(
  event: APIGatewayProxyEvent
): Promise<boolean> {
  const { qrCodeId } = event.queryStringParameters;

  logger.info('Checking if QR-Code exists and is valid.', qrCodeId);

  return qrCodeAccess.qrCodeIsValid(qrCodeId);
}
