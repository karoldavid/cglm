import * as AWS from 'aws-sdk';
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamoDBClient');

export function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');
    return new AWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8002',
    });
  }

  return new AWS.DynamoDB.DocumentClient();
}
