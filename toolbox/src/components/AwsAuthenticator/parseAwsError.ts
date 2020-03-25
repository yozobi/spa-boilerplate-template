export const parseAwsError = (err: Error) => {
  if (typeof err === 'string') {
    return err;
  }
  return err.message ? err.message : JSON.stringify(err);
};
