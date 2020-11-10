import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { getAttendees } from '../../businessLogic/attendees';
import { eventExists } from '../../businessLogic/events';

const logger = createLogger('getAttendees');

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

    const attendeeItems = await getAttendees(event);

    return {
      statusCode: 201,
      body: JSON.stringify({
        items: attendeeItems,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
