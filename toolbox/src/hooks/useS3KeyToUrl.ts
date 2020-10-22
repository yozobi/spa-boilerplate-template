import { useState, useEffect, useCallback } from 'react';
import { getS3Url } from 'toolbox';
import Storage from '@aws-amplify/storage';

/**
 * Takes in an S3 key, and returns
 * the public URL if the user has access to it
 */
export const useS3KeyToUrl = (s3key: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>();

  const constructUrl = useCallback(() => {
    try {
      if (s3key) {
        getS3Url(Storage, s3key).then((s3Url) => {
          setImageUrl(s3Url);
          setIsLoading(false);
        });
      }
    } catch (e) {
      setError('Error loading Image');
    }
  }, [s3key]);

  useEffect(() => {
    constructUrl();
  }, [constructUrl]);

  return { imageUrl, setImageUrl, isLoading, refetch: constructUrl, error };
};
