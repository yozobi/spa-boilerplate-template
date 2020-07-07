import { StorageClass } from '@aws-amplify/storage';
import uuid from 'uuid/v4';
import { useState, useEffect } from 'react';

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

/**
 * Use this hook to dynamically pull in the S3 URL
 * from the key and save it in state.
 *
 * Loom for clarity: https://www.loom.com/share/ec976f2821334b32bcac422ae37ccc64
 */
export const usePublicS3Url = (params: {
  s3Key: string;
  Storage: StorageClass;
  disabled?: boolean;
}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    let shouldResolve = true;
    if (params.s3Key && !params.disabled) {
      getS3Url(params.Storage, params.s3Key).then((url) => {
        if (shouldResolve) {
          setImageUrl(url);
        }
      });
    }
    return () => {
      shouldResolve = false;
    };
  }, [params.s3Key, params.disabled]);

  return imageUrl;
};
