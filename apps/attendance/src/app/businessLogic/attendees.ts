import { APIGatewayProxyEvent } from 'aws-lambda';
import * as uuid from 'uuid';
import { AttendeeItem } from '../models/AttendeeItem';
import { createLogger } from '../utils/logger';
import { CreateAttendeeRequest } from '../requests/CreateAttendeeRequest';
import { getUserId } from '../lambda/utils';
import { AttendeeAccess } from '../dataLayer/attendeeAccess';

const logger = createLogger('attendees');

const attendeeAccess = new AttendeeAccess();

export async function getAttendees(
  event: APIGatewayProxyEvent
): Promise<AttendeeItem[]> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;

  logger.info('Getting all attendees for an event.');

  return attendeeAccess.getAttendees(userId, eventId);
}

export async function getAttendee(
  event: APIGatewayProxyEvent
): Promise<AttendeeItem> {
  const { attendeeId } = event.pathParameters;

  logger.info('Getting attendee for an event.');

  return attendeeAccess.getAttendee(attendeeId);
}

export async function createAttendee(
  createAttendeeRequest: CreateAttendeeRequest,
  event: APIGatewayProxyEvent
): Promise<AttendeeItem> {
  const userId = getUserId(event);
  const eventId = event.pathParameters.eventId;
  const attendeeId = uuid.v4();

  logger.info('Creating attendee for event', eventId);

  return await attendeeAccess.createAttendee({
    userId: userId,
    eventId: eventId,
    attendeeId: attendeeId,
    timestamp: new Date().toISOString(),
    name: createAttendeeRequest.name,
    email: createAttendeeRequest.email,
  });
}
