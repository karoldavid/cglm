import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { createQrCode } from '../../businessLogic/qrCodes';

const logger = createLogger('createQrCode');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newQrCodeItem = await createQrCode(event);

    logger.info('Created new qrCode.');

    return {
      statusCode: 201,
      body: JSON.stringify({
        item: newQrCodeItem,
      }),
    };
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
