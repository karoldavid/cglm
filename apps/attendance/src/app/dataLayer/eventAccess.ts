import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { EventItem } from '../models/EventItem';
import { createDynamoDBClient } from './dynamoDBClient';

const logger = createLogger('eventAccess');

export class EventAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly eventsTable = process.env.EVENTS_TABLE,
    private readonly indexName = process.env.INDEX_NAME
  ) {}

  async getEvents(userId: string): Promise<EventItem[]> {
    logger.info('Getting all events');

    const result = await this.docClient
      .query({
        TableName: this.eventsTable,
        IndexName: this.indexName,
        KeyConditionExpression: 'userId = :userId',
        ExpressionAttributeValues: {
          ':userId': userId,
        },
      })
      .promise();

    const { Items: items } = result;
    return items as EventItem[];
  }

  async createEvent(event: EventItem): Promise<EventItem> {
    logger.info('Creating a new event');

    await this.docClient
      .put({
        TableName: this.eventsTable,
        Item: event,
      })
      .promise();

    return event;
  }

  async getEvent(eventId: string, userId: string): Promise<EventItem> {
    logger.info('Getting event.');
    const result = await this.docClient
      .get({
        TableName: this.eventsTable,
        Key: {
          userId: userId,
          eventId: eventId,
        },
      })
      .promise();

    const { Item: item } = result;
    return item as EventItem;
  }

  async eventExists(eventId: string, userId: string): Promise<boolean> {
    logger.info('Checking if event exists.');
    const result = await this.docClient
      .get({
        TableName: this.eventsTable,
        Key: {
          userId: userId,
          eventId: eventId,
        },
      })
      .promise();

    return !!result.Item;
  }

  async deleteEvent(eventId: string, userId: string): Promise<string> {
    const params = {
      TableName: this.eventsTable,
      Key: {
        userId: userId,
        eventId: eventId,
      },
    };
    try {
      await this.docClient.delete(params).promise();

      return eventId;
    } catch (err) {
      logger.info('Unable to delete item. Error JSON:', err);

      throw new Error(err);
    }
  }
}
