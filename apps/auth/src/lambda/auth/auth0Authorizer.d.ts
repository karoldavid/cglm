import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda';
import 'source-map-support/register';
import { JwtHeader } from 'jsonwebtoken';
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
    header: JwtHeader;
    payload: JwtPayload;
}
export declare const handler: (event: CustomAuthorizerEvent) => Promise<CustomAuthorizerResult>;
export declare function getToken(authHeader: string): string;
