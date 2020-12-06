import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { getQrCodes } from '../../businessLogic/qrCodes';
import { eventExists } from '../../businessLogic/events';

const logger = createLogger('getQrCodes');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('event', event);

    const validEventId = await eventExists(event);

    if (!validEventId) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Event does not exist.',
        }),
      };
    }

    const items = await getQrCodes(event);

    return {
      statusCode: 200,
      body: JSON.stringify({
        items,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
