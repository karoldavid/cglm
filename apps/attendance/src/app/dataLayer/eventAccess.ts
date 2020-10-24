import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { EventItem } from '../models/EventItem';

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

    const items = result.Items;
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
}

function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8002',
    });
  }

  return new AWS.DynamoDB.DocumentClient();
}
