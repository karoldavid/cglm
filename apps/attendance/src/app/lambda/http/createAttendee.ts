import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { CreateAttendeeRequest } from '../../requests/CreateAttendeeRequest';
import { createAttendee } from '../../businessLogic/attendees';
import { qrCodeIsValid, getQrCodeById } from '../../businessLogic/qrCodes';

const logger = createLogger('createAttendee');

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    let userId;

    logger.info(event);

    if (event.queryStringParameters && event.queryStringParameters.qrCodeId) {
      const isValid = await qrCodeIsValid(event);

      if (!isValid) {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'QR-Code is invalid.',
          }),
        };
      }

      const qrCode = await getQrCodeById(event.queryStringParameters.qrCodeId);
      userId = qrCode.userId;
    }

    const newAttendee: CreateAttendeeRequest = JSON.parse(event.body);

    const newAttendeeItem = await createAttendee(newAttendee, event, userId);

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
