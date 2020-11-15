import Axios from 'axios';

import { apiEndpoint } from '../../config';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import { AttendeeItem } from '../models/AttendeeItem';

export async function getAttendees(
  idToken: string,
  eventId: string
): Promise<AttendeeItem[]> {
  const response = await Axios.get(
    `${apiEndpoint}/events/${eventId}/attendees`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.items;
}

export async function getAttendee(
  idToken: string,
  eventId: string,
  attendeeId: string
): Promise<AttendeeItem> {
  const response = await Axios.get(
    `${apiEndpoint}/events/${eventId}/attendees/${attendeeId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}

export async function createAttendee(
  idToken: string,
  eventId: string,
  newAttendee: CreateAttendeeRequest
): Promise<AttendeeItem> {
  const response = await Axios.post(
    `${apiEndpoint}/events/${eventId}/attendees`,
    JSON.stringify(newAttendee),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}
