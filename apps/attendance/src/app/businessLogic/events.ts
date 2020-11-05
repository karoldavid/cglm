import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { EventItem } from '../models/EventItem';
import { createLogger } from '../utils/logger';
import { CreateEventRequest } from '../requests/CreateEventRequest';
import { getUserId } from '../lambda/utils';
import { EventAccess } from '../dataLayer/eventAccess';

const logger = createLogger('events');

const eventAccess = new EventAccess();

export async function getEvents(
  event: APIGatewayProxyEvent
): Promise<EventItem[]> {
  const userId = getUserId(event);
  logger.info('Getting all events');

  return eventAccess.getEvents(userId);
}

export async function createEvent(
  createEventRequest: CreateEventRequest,
  event: APIGatewayProxyEvent
): Promise<EventItem> {
  const itemId = uuid.v4();
  const userId = getUserId(event);

  logger.info('Creating event.', itemId, userId);

  return await eventAccess.createEvent({
    userId: userId,
    eventId: itemId,
    createdAt: new Date().toISOString(),
    name: createEventRequest.name,
    eventDate: createEventRequest.eventDate,
  });
}

export async function eventExists(
  event: APIGatewayProxyEvent
): Promise<boolean> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  logger.info('Checking if event exists.', eventId, userId);

  return eventAccess.eventExists(eventId, userId);
}
