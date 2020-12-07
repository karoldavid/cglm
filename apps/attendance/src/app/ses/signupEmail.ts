import * as AWS from 'aws-sdk';
import { SendTemplatedEmailResponse } from 'aws-sdk/clients/ses';

import { createLogger } from '../utils/logger';

const templateParams = require('./signup-email-template.json');

const logger = createLogger('sendSignupEmail');

const SES = new AWS.SES({ region: process.env.AWS_REGION });

const { TemplateName: templateName } = templateParams.Template;

export const sendSignupEmail = async (
  recipient: string,
  sender: string,
  name: string,
  url: string
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
    url,
  });

  const params = {
    Destination: {
      ToAddresses: [recipient],
    },
    Source: sender,
    Template: templateName,
    TemplateData: templateData,
  };

  logger.info(`Sending signup email to: ${recipient}`);

  return SES.sendTemplatedEmail(params).promise();
};
