import { APIGatewayProxyEvent } from 'aws-lambda';
import { EventItem } from '../models/EventItem';
import { createLogger } from '../utils/logger';
import { getUserId } from '../lambda/utils';

const logger = createLogger('events');

export async function getEvents(
  event: APIGatewayProxyEvent
): Promise<EventItem[]> {
  const userId = getUserId(event);
  logger.info('Getting all events');

  await new Promise((r) => setTimeout(r, 500));

  return [
    {
      userId,
      eventId: '12345',
      createdAt: '15-10-2020',
      name: 'Show',
      eventDate: '22-10-2020',
    },
  ];
}
