const simpleEmailAddressRegex = /.+\@.+\..+/;

/**
 * Check if a string is an email
 */
export const isEmailAddress = (email: string) => {
  return simpleEmailAddressRegex.test(email);
};
