import { apiEndpoint } from '../../config';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import { AttendeeItem } from '../models/AttendeeItem';
import Axios from 'axios';

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

export async function createAttendee(
  idToken: string,
  eventId,
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
