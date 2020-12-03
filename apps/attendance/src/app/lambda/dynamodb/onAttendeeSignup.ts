import 'source-map-support/register';
import { DynamoDBStreamEvent, DynamoDBStreamHandler } from 'aws-lambda';
import { sendConfirmationEmail } from '../../ses/confirmationEmail';

import { createLogger } from '../../utils/logger';

const logger = createLogger('onAttendeeSignup');

export const handler: DynamoDBStreamHandler = async (
  event: DynamoDBStreamEvent
) => {
  for (const record of event.Records) {
    logger.info(`Processing record ${JSON.stringify(record)}`);
    if (record.eventName === 'INSERT') {
      try {
        const response = await sendConfirmationEmail(
          record.dynamodb.NewImage.email.S,
          process.env.sesSenderEmail,
          record.dynamodb.NewImage.name.S
        );
        logger.info(response);
      } catch (e) {
        logger.info(e);
      }
    }
  }
};
