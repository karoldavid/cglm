import { useQuery, useMutation, useQueryCache } from 'react-query';

import { apiEndpoint } from '../../config';
import { CreateEventRequest } from '../types/CreateEventRequest';
import { EventItem } from '../models/EventItem';

const QUERY_KEY = 'events';

interface EventsData {
  items: EventItem[];
}

interface EventData {
  item: EventItem;
}

interface CreateEventVariables {
  newEvent: CreateEventRequest;
}

interface DeleteEventVariables {
  eventId: string;
}

export function useEvents(idToken: string) {
  return useQuery<EventsData, Error>(QUERY_KEY, () =>
    fetch(`${apiEndpoint}/events`, {
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

export function useEvent(idToken: string, eventId: string) {
  return useQuery<EventData, Error>([QUERY_KEY, eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}`, {
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

export function useCreateEvent(idToken: string) {
  const queryCache = useQueryCache();
  return useMutation(({ newEvent }: CreateEventVariables) =>
    fetch(`${apiEndpoint}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(newEvent),
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      queryCache.invalidateQueries([QUERY_KEY]);
      return res.json();
    })
  );
}

export function useDeleteEvent(idToken: string) {
  const queryCache = useQueryCache();
  return useMutation(({ eventId }: DeleteEventVariables) =>
    fetch(`${apiEndpoint}/events/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(res.statusText);
      queryCache.invalidateQueries([QUERY_KEY]);
      return res.json();
    })
  );
}
