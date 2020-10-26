import { apiEndpoint } from '../../config';
import { Event } from '../types/Event';
import Axios from 'axios';

export async function getEvents(idToken: string): Promise<Event[]> {
  console.log('Fetching Events');

  const response = await Axios.get(`${apiEndpoint}/events`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  return response.data.items;
}
