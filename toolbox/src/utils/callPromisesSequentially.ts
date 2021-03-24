/**
 * Handy for mapping over a list of promises, calling them sequentially
 */
export async function callPromisesSequentially<ArrayMember, Data>(
  array: ArrayMember[],
  mapperFunction: (params: ArrayMember, index: number) => Promise<Data>,
): Promise<Data[]> {
  let dataArray: Data[] = [];
  await array.reduce(async (promise, param, index) => {
    await promise;
    const dataElement = await mapperFunction(param, index);
    dataArray.push(dataElement);
  }, Promise.resolve());

  return dataArray;
}
