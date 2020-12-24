import * as AWS from 'aws-sdk';
import * as AWSXRay from 'aws-xray-sdk';
import { createLogger } from '../utils/logger';

const logger = createLogger('dynamoDBClient');

const XAWS = AWSXRay.captureAWS(AWS);

export function createDynamoDBClient() {
  if (process.env.IS_OFFLINE) {
    logger.info('Creating a local DynamoDB instance');
    return new XAWS.DynamoDB.DocumentClient({
      region: 'localhost',
      endpoint: 'http://localhost:8002',
    });
  }

  return new XAWS.DynamoDB.DocumentClient();
}
