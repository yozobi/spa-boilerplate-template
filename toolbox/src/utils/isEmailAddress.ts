const simpleEmailAddressRegex = /.+\@.+\..+/;

export const isEmailAddress = (email: string) => {
  return simpleEmailAddressRegex.test(email);
};
