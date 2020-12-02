import * as AWS from 'aws-sdk';
import { SendEmailResponse } from 'aws-sdk/clients/ses';

import { createLogger } from '../utils/logger';

const logger = createLogger('sendConfirmationEmail');

const SES = new AWS.SES({ region: process.env.AWS_REGION });

export const sendConfirmationEmail = (
  recipient: string,
  name: string
): Promise<SendEmailResponse> => {
  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: `Dear ${name},\n\n Thank you very much for registering your attendance.\n\n Best Regards`,
        },
      },

      Subject: { Data: 'Signup Successfull' },
    },
    Source: process.env.SES_SENDER_EMAIL,
  };

  logger.info(`Sending confirmation email to: ${recipient}`);

  return SES.sendEmail(params).promise();
};
