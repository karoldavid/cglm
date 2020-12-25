import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { deleteEvent } from '../../businessLogic/events';

const logger = createLogger('deleteEvent');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info(event);

    const eventId = await deleteEvent(event);

    return {
      statusCode: 200,
      body: JSON.stringify({ eventId }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
