export interface QrCodeItem {
  userId: string;
  eventId: string;
  qrCodeId: string;
  timestamp: string;
  base64: string;
  shortUrl: string;
  expiration: number;
}
