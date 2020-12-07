import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { UpdateTemplateRequest } from 'aws-sdk/clients/ses';
import { updateEmailTemplate } from '../../ses/updateEmailTemplate';

const logger = createLogger('updateEmailTemplate');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const templateParams: UpdateTemplateRequest = JSON.parse(event.body);
    try {
      const response = await updateEmailTemplate(templateParams);
      logger.info('Updated email template.', response);
      return {
        statusCode: 201,
        body: 'ok',
      };
    } catch (e) {
      logger.info(e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: e.message,
        }),
      };
    }
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
