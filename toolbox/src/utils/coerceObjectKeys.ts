type RegexObject<T> = {
  [K in keyof T]: RegExp;
};

/**
 * Helps turn messy objects, with keys in all different shapes,
 * and coerce them to nice, clean objects we can parse.
 *
 * Check the test file for usage.
 */
export const coerceObjectKeys = <T>(
  regexMap: RegexObject<T>,
  objectToCoerce: object,
): Partial<T> => {
  let objectToReturn: Partial<T> = {};

  const arrayifiedObject = Object.entries(objectToCoerce);

  Object.entries(regexMap).forEach(([desiredKey, regex]) => {
    const matches = arrayifiedObject.filter(([key]) => {
      return (regex as RegExp).test(key);
    });
    if (matches.length > 0) {
      (objectToReturn as any)[desiredKey] = matches?.[0][1];
    }
  });

  return objectToReturn;
};
