import { useQuery, useMutation, useQueryCache } from 'react-query';

import { getQueryStringParams } from '@cglm/common-util';
import { apiEndpoint } from '../../config';
import { CreateAttendeeRequest } from '../types/CreateAttendeeRequest';
import { AttendeeItem } from '../models/AttendeeItem';

const QUERY_KEY = 'attendees';

interface AttendeesData {
  items: AttendeeItem[];
}

interface AttendeeData {
  item: AttendeeItem;
}

interface AttendeeGuestParams {
  qrCodeId: string;
}

interface CreateAttendeeVariables {
  eventId: string;
  newAttendee: CreateAttendeeRequest;
}

interface CreateAttendeeGuestVariables {
  eventId: string;
  newAttendee: CreateAttendeeRequest;
  params: AttendeeGuestParams;
}

export function useAttendees(idToken: string, eventId: string) {
  return useQuery<AttendeesData, Error>([QUERY_KEY, eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/attendees`, {
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

export function useAttendee(
  idToken: string,
  eventId: string,
  attendeeId: string
) {
  return useQuery<AttendeeData, Error>([QUERY_KEY, eventId, attendeeId], () =>
    fetch(`${apiEndpoint}/events/${eventId}/attendees/${attendeeId}`, {
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

export function useCreateAttendee(idToken: string) {
  const queryCache = useQueryCache();
  return useMutation(({ eventId, newAttendee }: CreateAttendeeVariables) =>
    fetch(`${apiEndpoint}/events/${eventId}/attendees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(newAttendee),
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      queryCache.invalidateQueries([QUERY_KEY]);
      return res.json();
    })
  );
}

export function useCreateAttendeeGuest(idToken: string) {
  const queryCache = useQueryCache();
  return useMutation(
    ({ eventId, newAttendee, params }: CreateAttendeeGuestVariables) =>
      fetch(
        `${apiEndpoint}/events/${eventId}/attendees${getQueryStringParams(
          params
        )}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(newAttendee),
        }
      ).then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        queryCache.invalidateQueries([QUERY_KEY]);
        return res.json();
      })
  );
}
