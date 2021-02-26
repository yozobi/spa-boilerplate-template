/**
 * Handy for mapping over a list of promises, calling them sequentially
 */
export async function callPromisesSequentially<ArrayMember, Data>(
  array: ArrayMember[],
  mapperFunction: (params: ArrayMember) => Promise<Data>,
): Promise<Data[]> {
  let dataArray: Data[] = [];
  await array.reduce(async (promise, param) => {
    await promise;
    const dataElement = await mapperFunction(param);
    dataArray.push(dataElement);
  }, Promise.resolve());

  return dataArray;
}
