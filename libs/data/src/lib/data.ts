export interface AttendeeItem {
  userId: string;
  eventId: string;
  attendeeId: string;
  timestamp: string;
  name: string;
  email: string;
}

export interface EventItem {
  userId: string;
  eventId: string;
  createdAt: string;
  name: string;
  eventDate: string;
}

export interface QrCodeItem {
  userId: string;
  eventId: string;
  qrCodeId: string;
  base64: string;
  shortUrl: string;
  timestamp: string;
  expiration: number;
}
