import 'source-map-support/register';
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';

import { createLogger } from '../../utils/logger';

const logger = createLogger('onAttendeeSignUp');

export const handler: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  logger.info(`Processing events batch from DynamoDB ${JSON.stringify(event)}`);

  for (const record of event.Records) {
    logger.info(`Processing record ${JSON.stringify(record)}`);
  }
};
