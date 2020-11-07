import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { getEvent } from '../../businessLogic/events';

const logger = createLogger('getEvent');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('event', event);

    const item = await getEvent(event);

    return {
      statusCode: 200,
      body: JSON.stringify({ item }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
