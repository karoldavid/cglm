import { useQuery, useMutation } from 'react-query';

import { apiEndpoint } from '../../config';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import { AttendeeItem } from '../models/AttendeeItem';

interface AttendeesData {
  items: AttendeeItem[];
}

interface AttendeeData {
  item: AttendeeItem;
}

interface CreateAttendeeVariables {
  eventId: string;
  newAttendee: CreateAttendeeRequest;
}

export function useAttendees(idToken: string, eventId: string) {
  return useQuery<AttendeesData, Error>(['list-attendees', eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/attendees`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}

export function useAttendee(
  idToken: string,
  eventId: string,
  attendeeId: string
) {
  return useQuery<AttendeeData, Error>(
    ['list-attendees', eventId, attendeeId],
    () =>
      fetch(`${apiEndpoint}/events/${eventId}/attendees/${attendeeId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      }).then((res) => res.json())
  );
}

export function useCreateAttendee(idToken: string) {
  return useMutation(({ eventId, newAttendee }: CreateAttendeeVariables) =>
    fetch(`${apiEndpoint}/events/${eventId}/attendees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(newAttendee),
    }).then((res) => res.json())
  );
}
