import * as AWS from 'aws-sdk';
import { SendTemplatedEmailResponse } from 'aws-sdk/clients/ses';

import { createLogger } from '../utils/logger';

const templateParams = require('./confirmation-email-template.json');

const logger = createLogger('sendConfirmationEmail');

const SES = new AWS.SES({ region: process.env.AWS_REGION });

const { TemplateName: templateName } = templateParams.Template;

export const sendConfirmationEmail = async (
  recipient: string,
  sender: string,
  name: string
): Promise<SendTemplatedEmailResponse> => {
  try {
    logger.info(`Checking if template ${templateName} exists.`);
    await SES.getTemplate({ TemplateName: templateName }).promise();
    logger.info(`Template ${templateName} exists.`);
  } catch (e) {
    logger.info(e);
    logger.info(`Creating template ${templateName}.`);
    await SES.createTemplate(templateParams).promise();
  }

  const templateData = JSON.stringify({
    name,
  });

  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Source: sender,
    Template: templateName,
    TemplateData: templateData,
  };

  logger.info(`Sending confirmation email to: ${recipient}`);

  return SES.sendTemplatedEmail(params).promise();
};
