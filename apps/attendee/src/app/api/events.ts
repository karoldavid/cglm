import Axios from 'axios';

import { apiEndpoint } from '../../config';
import { CreateEventRequest } from '../types/CreateEventRequest';
import { EventItem } from '../models/EventItem';

export async function getEvents(idToken: string): Promise<EventItem[]> {
  const response = await Axios.get(`${apiEndpoint}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.items;
}

export async function getEvent(
  idToken: string,
  eventId: string
): Promise<EventItem> {
  const response = await Axios.get(`${apiEndpoint}/events/${eventId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.item;
}

export async function createEvent(
  idToken: string,
  newEvent: CreateEventRequest
): Promise<EventItem> {
  const response = await Axios.post(
    `${apiEndpoint}/events`,
    JSON.stringify(newEvent),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data.item;
}
