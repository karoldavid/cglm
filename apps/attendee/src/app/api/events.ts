import { useQuery, useMutation } from 'react-query';

import { apiEndpoint } from '../../config';
import { CreateEventRequest } from '../types/CreateEventRequest';
import { EventItem } from '../models/EventItem';

interface EventsData {
  items: EventItem[];
}

interface EventData {
  item: EventItem;
}

interface CreateEventVariables {
  newEvent: CreateEventRequest;
}

export function useEvents(idToken: string) {
  return useQuery<EventsData, Error>('events', () =>
    fetch(`${apiEndpoint}/events`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}

export function useEvent(idToken: string, eventId: string) {
  return useQuery<EventData, Error>(['events', eventId], () =>
    fetch(`${apiEndpoint}/events/${eventId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json())
  );
}

export function useCreateEvent(idToken: string) {
  return useMutation(({ newEvent }: CreateEventVariables) =>
    fetch(`${apiEndpoint}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(newEvent),
    }).then((res) => res.json())
  );
}
