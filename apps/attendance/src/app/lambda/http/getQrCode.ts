import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';

import { createLogger } from '../../utils/logger';
import { getQrCode } from '../../businessLogic/qrCodes';

const logger = createLogger('getQrCode');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    logger.info('event', event);

    const item = await getQrCode(event);

    if (item) {
      return {
        statusCode: 200,
        body: JSON.stringify({ item }),
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
