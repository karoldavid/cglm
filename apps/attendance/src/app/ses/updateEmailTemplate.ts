import * as AWS from 'aws-sdk';
import {
  CreateTemplateRequest,
  CreateTemplateResponse,
} from 'aws-sdk/clients/ses';

import { createLogger } from '../utils/logger';

const logger = createLogger('updateEmailTemplate');

const SES = new AWS.SES({ region: process.env.AWS_REGION });

export const updateEmailTemplate = async (
  templateParams: CreateTemplateRequest
): Promise<CreateTemplateResponse> => {
  const {
    Template: { TemplateName: templateName },
  } = templateParams;

  logger.info(`Updating template ${templateName}.`);
  return SES.updateTemplate(templateParams).promise();
};
