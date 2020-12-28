import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import * as uuid from 'uuid';

import { eventExists, getEvent } from '../../businessLogic/events';
import { createLogger } from '../../utils/logger';
import { createImage, getUploadUrl } from '../../businessLogic/images';

const logger = createLogger('generateUploadUrl');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('Generate upload url for Event attachment.');

    const isValidEventId = await eventExists(event);

    if (!isValidEventId) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Event does not exist',
        }),
      };
    }

    const eventItem = await getEvent(event);

    const imageId = uuid.v4();

    await createImage(imageId, eventItem, event);

    const url = getUploadUrl(eventItem.eventId);

    logger.info(`S3 Upload Url: ${url}`);

    return {
      statusCode: 201,
      body: JSON.stringify({
        uploadUrl: url,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
