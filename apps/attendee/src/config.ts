const apiId = process.env.REACT_APP_API_ID
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: process.env.NX_AUTH0_CONFIG_DOMAIN,
  clientId: process.env.NX_AUTH0_CONFIG_CLIENT_ID,
  callbackUrl: process.env.NX_AUTH0_CONFIG_CALLBACK_URL
}
