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

export async function getEvent(
  event: APIGatewayProxyEvent
): Promise<EventItem> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  logger.info('Get event.');

  return eventAccess.getEvent(eventId, userId);
}

export async function eventExists(
  event: APIGatewayProxyEvent
): Promise<boolean> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  logger.info('Checking if event exists.', eventId, userId);

  return eventAccess.eventExists(eventId, userId);
}

export async function deleteEvent(
  event: APIGatewayProxyEvent
): Promise<string> {
  const { eventId } = event.pathParameters;
  const userId = getUserId(event);

  logger.info('Deleting event.');

  return await eventAccess.deleteEvent(eventId, userId);
}

export async function updateEventUrl(
  eventId: string,
  attachmentUrl: string,
  event: APIGatewayProxyEvent
): Promise<string> {
  const userId = getUserId(event);

  logger.info('Updating Event.');

  return await eventAccess.updateEventUrl(userId, eventId, attachmentUrl);
}

export async function updateEventThumbnailUrl(
  eventId: string,
  thumbnailUrl: string,
  event: APIGatewayProxyEvent
): Promise<string> {
  const userId = getUserId(event);

  logger.info('Updating Event thumbnail url.');

  return await eventAccess.updateEventThumbnailUrl(
    userId,
    eventId,
    thumbnailUrl
  );
}

export async function updateEventThumbnailUrl2(
  userId: string,
  eventId: string,
  thumbnailUrl: string
): Promise<string> {
  logger.info('Updating Event thumbnail url.');

  return await eventAccess.updateEventThumbnailUrl2(
    userId,
    eventId,
    thumbnailUrl
  );
}
