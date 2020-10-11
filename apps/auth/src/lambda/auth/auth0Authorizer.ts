import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import 'source-map-support/register';
import { verify, decode, JwtHeader } from 'jsonwebtoken';
import Axios from 'axios';

// import { /* createLogger */, /* Jwt, JwtPayload */ } from '@cglm/common-util';

// const logger = createLogger('auth');

// console.log(test)

export interface JwtPayload {
  iss: string;
  sub: string;
  iat: number;
  exp: number;
}

/**
 * Interface representing a JWT token
 */
export interface Jwt {
  header: JwtHeader
  payload: JwtPayload
}



const jwksUrl = process.env.AUTH_0_JWKS_URL;

const certToPEM = (cert) => {
  cert = cert.match(/.{1,64}/g).join('\n');
  cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
  return cert;
};

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  // logger.info('Authorizing a user', event.authorizationToken);
  try {
    const jwtToken = await verifyToken(event.authorizationToken);
    // logger.info('User was authorized', jwtToken);

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
    };
  } catch (e) {
    // logger.error('User not authorized', { error: e.message });

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    };
  }
};

async function verifyToken(authHeader: string): Promise<JwtPayload> {
  const token = getToken(authHeader);
  const jwt: Jwt = decode(token, { complete: true }) as Jwt;
  let response;

  try {
    response = await Axios.get(jwksUrl);
  } catch (error) {
    throw error;
  }

  const keys = response.data.keys;

  // https://auth0.com/blog/navigating-rs256-and-jwks/
  const signingKeys = keys
    .filter(
      (key) =>
        key.use === 'sig' && // JWK property `use` determines the JWK is for signature verification
        key.kty === 'RSA' && // We are only supporting RSA (RS256)
        key.kid && // The `kid` must be present to be useful for later
        ((key.x5c && key.x5c.length) || (key.n && key.e)) // Has useful public keys
    )
    .map((key) => {
      return { kid: key.kid, nbf: key.nbf, publicKey: certToPEM(key.x5c[0]) };
    });

  const kid = jwt.header.kid;

  // https://auth0.com/blog/navigating-rs256-and-jwks/
  const signingKey = signingKeys.find((key) => key.kid === kid);

  try {
    verify(token, signingKey.publicKey, {
      algorithms: ['RS256'],
    });

    return jwt.payload;
  } catch (error) {
    throw error;
  }
}

export function getToken(authHeader: string): string {
  if (!authHeader) throw new Error('No authentication header');

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header');

  const split = authHeader.split(' ');
  const token = split[1];

  return token;
}
