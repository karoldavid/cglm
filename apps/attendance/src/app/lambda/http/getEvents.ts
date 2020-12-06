import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { getEvents } from '../../businessLogic/events';

const logger = createLogger('getEvents');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('event', event);

    const items = await getEvents(event);

    if (items) {
      return {
        statusCode: 200,
        body: JSON.stringify({ items }),
      };
    }

    return {
      statusCode: 404,
      body: '',
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
