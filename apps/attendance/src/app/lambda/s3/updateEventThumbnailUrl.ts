import { SNSEvent, SNSHandler, S3EventRecord } from 'aws-lambda';
import 'source-map-support/register';
import { updateEventThumbnailUrl2 } from '../../businessLogic/events';
import { createLogger } from '../../utils/logger';

const logger = createLogger('updateEventThumbnailUrl');

const thumbnailBucketName = process.env.THUMBNAILS_S3_BUCKET;

export const handler: SNSHandler = async (event: SNSEvent) => {
  logger.info(`Processing SNS event ${JSON.stringify(event)}`);
  for (const snsRecord of event.Records) {
    const s3EventStr = snsRecord.Sns.Message;
    logger.info(`Processing S3 event ${s3EventStr}`);
    const s3Event = JSON.parse(s3EventStr);

    for (const record of s3Event.Records) {
      await processImage(record);
    }
  }
};

async function processImage(record: S3EventRecord) {
  const { key } = record.s3.object;
  const thumbnailBucketUrl = `https://${thumbnailBucketName}.s3.amazonaws.com/${key}`;
  logger.info(`Processing S3 item with key: ${key}`);
  await updateEventThumbnailUrl2(
    'userId',
    key,
    thumbnailBucketUrl
  );
}
