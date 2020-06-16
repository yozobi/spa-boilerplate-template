export const extractOnlySomeAttributes = <I extends object, K extends keyof I>(
  object: I,
  attributeKeys: K[],
): Pick<I, K> => {
  const newObject: any = {};
  attributeKeys.forEach((key) => {
    newObject[key] = object[key];
  });
  return newObject;
};
