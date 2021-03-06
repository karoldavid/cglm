import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { AttendeeItem } from '../models/AttendeeItem';
import { createDynamoDBClient } from './dynamoDBClient';

const logger = createLogger('attendeeAccess');

export class AttendeeAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly attendeesTable = process.env.ATTENDEES_TABLE,
    private readonly attendeeIdIndex = process.env.ATTENDEE_ID_INDEX
  ) {}

  async getAttendees(userId: string, eventId: string): Promise<AttendeeItem[]> {
    logger.info('Getting all attendees for an event.', eventId, userId);

    const attendees = await this.getAttendeesPerEvent(eventId);

    return attendees;
  }

  async getAttendee(attendeeId: string): Promise<AttendeeItem> {
    const attendee = await this.getAttendeeForEvent(attendeeId);

    return attendee;
  }

  async createAttendee(attendee: AttendeeItem): Promise<AttendeeItem> {
    logger.info('Creating a new attendee');

    await this.docClient
      .put({
        TableName: this.attendeesTable,
        Item: attendee,
      })
      .promise();

    return attendee;
  }

  async getAttendeesPerEvent(eventId: string): Promise<any> {
    logger.info('Getting all attendees for event', eventId);
    const result = await this.docClient
      .query({
        TableName: this.attendeesTable,
        KeyConditionExpression: 'eventId = :eventId',
        ExpressionAttributeValues: {
          ':eventId': eventId,
        },
        ScanIndexForward: false,
      })
      .promise();

    return result.Items;
  }

  async getAttendeeForEvent(attendeeId: string): Promise<any> {
    logger.info('Getting an attendee for an event.');

    const result = await this.docClient
      .query({
        TableName: this.attendeesTable,
        IndexName: this.attendeeIdIndex,
        KeyConditionExpression: 'attendeeId = :attendeeId',
        ExpressionAttributeValues: {
          ':attendeeId': attendeeId,
        },
      })
      .promise();

    return result.Items[0];
  }
}
