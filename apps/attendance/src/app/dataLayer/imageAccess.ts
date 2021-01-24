import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';
import { ImageItem } from '../models/ImageItem';
import { createDynamoDBClient } from './dynamoDBClient';

const logger = createLogger('imageAccess');

const urlExpiration = 3000 || process.env.SIGNED_URL_EXPIRATION;

const s3 = new AWS.S3({
  signatureVersion: 'v4',
});

export class ImageAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly imagesTable = process.env.IMAGES_TABLE,
    readonly bucketName = process.env.IMAGES_S3_BUCKET,
    readonly thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET
  ) {}

  async putImage(newItem: ImageItem): Promise<ImageItem> {
    logger.info('Creating image item.');

    await this.docClient
      .put({
        TableName: this.imagesTable,
        Item: newItem,
      })
      .promise();

    return newItem;
  }

  getUploadUrl(eventId: string): string {
    logger.info('Getting S3 Upload Url.');
    return s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: eventId,
      Expires: urlExpiration,
    });
  }
}
