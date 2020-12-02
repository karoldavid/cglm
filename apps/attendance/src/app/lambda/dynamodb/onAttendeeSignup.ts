import 'source-map-support/register';
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { sendConfirmationEmail } from '../../ses/confirmationEmail';

import { createLogger } from '../../utils/logger';

const logger = createLogger('onAttendeeSignup');

export const handler: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  logger.info(`Processing events batch from DynamoDB ${JSON.stringify(event)}`);

  for (const record of event.Records) {
    logger.info(`Processing record ${JSON.stringify(record)}`);
    if (record.eventName === 'INSERT') {
      const response = await sendConfirmationEmail(
        record.dynamodb.NewImage.email.S,
        record.dynamodb.NewImage.name.S
      );
      logger.info(response);
    }
  }
};
