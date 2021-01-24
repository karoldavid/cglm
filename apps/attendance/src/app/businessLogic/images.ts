import { APIGatewayProxyEvent } from 'aws-lambda';
import { EventItem } from '../models/EventItem';
import { createLogger } from '../utils/logger';
import { getUserId } from '../lambda/utils';
import { updateEventUrl, updateEventThumbnailUrl } from './events';
import { ImageAccess } from '../dataLayer/imageAccess';

const logger = createLogger('images');

const imageAccess = new ImageAccess();

export async function createImage(
  imageId: string,
  eventItem: EventItem,
  event: APIGatewayProxyEvent
) {
  const userId = getUserId(event);
  const { eventId } = eventItem;
  const attachmentUrl = `https://${imageAccess.bucketName}.s3.amazonaws.com/${eventId}`;
  const thumbnailBucketUrl = `https://${imageAccess.thumbnailBucketName}.s3.amazonaws.com/${eventId}`;
  const timestamp = new Date().toISOString();

  const newItem = {
    userId,
    eventId,
    imageId,
    timestamp,
    ...eventItem,
    attachmentUrl,
    thumbnailBucketUrl,
  };

  logger.info('Creating new item.');

  await updateEventUrl(eventId, attachmentUrl, event);

  await updateEventThumbnailUrl(eventId, thumbnailBucketUrl, event);

  return await imageAccess.putImage(newItem);
}

export function getUploadUrl(eventId: string): string {
  return imageAccess.getUploadUrl(eventId);
}
