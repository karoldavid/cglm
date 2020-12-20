export interface QrCodeItem {
  userId: string;
  eventId: string;
  qrCodeId: string;
  base64: string;
  shortUrl: string;
  timestamp: string;
  expiration: number;
}
