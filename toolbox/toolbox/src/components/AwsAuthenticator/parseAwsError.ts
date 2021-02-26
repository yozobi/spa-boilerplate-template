export const parseAwsError = (err: Error | string) => {
  if (typeof err === 'string') {
    return err;
  }
  return err.message ? err.message : JSON.stringify(err);
};
