import * as winston from 'winston';
/**
 * Create a logger instance to write log messages in JSON format.
 *
 * @param loggerName - a name of a logger that will be added to all messages
 */
export declare function createLogger(loggerName: string): winston.Logger;
