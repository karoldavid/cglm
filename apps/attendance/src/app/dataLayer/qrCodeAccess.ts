import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { QrCodeItem } from '../models/QrCodeItem';
import { createDynamoDBClient } from './dynamoDBClient';

const logger = createLogger('qrCodeAccess');

export class QrCodeAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly qrCodesTable = process.env.QR_CODES_TABLE,
    private readonly qrCodeIdIndex = process.env.QR_CODE_ID_INDEX
  ) {}

  async getQrCodes(userId: string, eventId: string): Promise<QrCodeItem[]> {
    logger.info('Getting all qr codes for an event.', eventId, userId);

    const qrCodes = await this.getQrCodesPerEvent(eventId);

    return qrCodes;
  }

  async getQrCode(qrCodeId: string): Promise<QrCodeItem> {
    const qrCode = await this.getQrCodeForEvent(qrCodeId);

    return qrCode;
  }

  async createQrCode(qrCode: QrCodeItem): Promise<QrCodeItem> {
    logger.info('Creating a new qrCode');

    await this.docClient
      .put({
        TableName: this.qrCodesTable,
        Item: qrCode,
      })
      .promise();

    return qrCode;
  }

  async getQrCodesPerEvent(eventId: string): Promise<any> {
    logger.info('Getting all qr codes for an event.');

    const result = await this.docClient
      .query({
        TableName: this.qrCodesTable,
        KeyConditionExpression: 'eventId = :eventId',
        ExpressionAttributeValues: {
          ':eventId': eventId,
        },
        ScanIndexForward: false,
      })
      .promise();

    return result.Items;
  }

  async getQrCodeForEvent(qrCodeId: string): Promise<any> {
    logger.info('Getting a qr code for an event.');

    const result = await this.docClient
      .query({
        TableName: this.qrCodesTable,
        IndexName: this.qrCodeIdIndex,
        KeyConditionExpression: 'qrCodeId = :qrCodeId',
        ExpressionAttributeValues: {
          ':qrCodeId': qrCodeId,
        },
      })
      .promise();

    return result.Items[0];
  }
}
