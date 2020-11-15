const apiId = process.env.NX_API_ID;
const apiPort = process.env.NX_API_PORT;

export const apiEndpoint =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:${apiPort}/dev`
    : `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`;

export const authConfig = {
  domain: process.env.NX_AUTH0_CONFIG_DOMAIN,
  clientId: process.env.NX_AUTH0_CONFIG_CLIENT_ID,
  callbackUrl: process.env.NX_AUTH0_CONFIG_CALLBACK_URL,
};
