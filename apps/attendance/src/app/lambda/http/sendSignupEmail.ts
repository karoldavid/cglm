import 'source-map-support/register';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import { createLogger } from '../../utils/logger';
import { SendSignupEmailRequest } from '../../requests/SendSignupEmailRequest';
import { sendSignupEmail } from '../../ses/signupEmail';

const logger = createLogger('sendSignupEmail');

const SES_SENDER_EMAIL = process.env.sesSenderEmail;

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { name, recipient, url, qrcode }: SendSignupEmailRequest = JSON.parse(
      event.body
    );
    try {
      const response = await sendSignupEmail(recipient, SES_SENDER_EMAIL, {
        name,
        recipient,
        url,
        qrcode,
      });
      logger.info('Sent signup email.', response);
      return {
        statusCode: 200,
        body: 'ok',
      };
    } catch (e) {
      logger.info(e);
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: e.message,
        }),
      };
    }
  }
);

handler.use(
  cors({
    credentials: true,
  })
);
