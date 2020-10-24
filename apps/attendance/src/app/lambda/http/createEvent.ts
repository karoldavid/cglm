import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { CreateEventRequest } from '../../requests/CreateEventRequest';
import { createEvent } from '../../businessLogic/events';

const logger = createLogger('createEvent');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newEvent: CreateEventRequest = JSON.parse(event.body);

    const newItem = await createEvent(newEvent, event);

    logger.info('Created new event item.');

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newItem,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
