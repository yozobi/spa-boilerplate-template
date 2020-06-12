import { StorageClass } from '@aws-amplify/storage';
import uuid from 'uuid/v4';

/**
 * Adds a file to S3 storage
 */
export const addFileToStorage = async (
  Storage: StorageClass,
  file: File,
): Promise<{ s3Key: string }> => {
  const extension = file?.name?.split('.').pop() || '';
  const { type: mimeType } = file;
  const id = uuid();
  const s3Key = `${id}.${extension}`;
  await Storage.put(s3Key, file, {
    contentType: mimeType,
    // level: "protected"
  });
  return {
    s3Key,
  };
};

/**
 * Gets the S3 link, which you can put in a 'src' property
 */
export const getS3Url = async (
  Storage: StorageClass,
  s3Key: string,
): Promise<string> => {
  return Storage.get(s3Key).then((url) => url.toString());
};
