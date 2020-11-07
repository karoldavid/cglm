import { apiEndpoint } from '../../config';
import { CreateEventRequest } from '../types/CreateEventRequest';
import { Event } from '../models/Event';
import Axios from 'axios';

export async function getEvents(idToken: string): Promise<Event[]> {
  const response = await Axios.get(`${apiEndpoint}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.items;
}

export async function createEvent(
  idToken: string,
  newEvent: CreateEventRequest
): Promise<Event> {
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
