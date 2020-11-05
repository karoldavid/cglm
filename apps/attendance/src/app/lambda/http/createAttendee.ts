import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { CreateAttendeeRequest } from '../../requests/CreateAttendeeRequest';
import { createAttendee } from '../../businessLogic/attendees';

const logger = createLogger('createAttendee');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newAttendee: CreateAttendeeRequest = JSON.parse(event.body);

    const newAttendeeItem = await createAttendee(newAttendee, event);

    logger.info('Created new attendee item.');

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newAttendeeItem,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
