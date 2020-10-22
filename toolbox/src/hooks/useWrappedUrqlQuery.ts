import { UseQueryResponse, UseQueryState, UseQueryArgs } from 'urql';

type Status =
  | 'no-data-of-any-type-found'
  | 'has-data'
  | 'no-data-found-with-those-filters'
  | 'has-errored';

/**
 * This query provides a helpful interface for list pages,
 * to ensure that we're covering all the states our data can be in.
 *
 * @deprecated - too complex
 */
export const useWrappedUrqlQuery = <T, V, D>(
  useQuery: (args: Omit<UseQueryArgs<V>, 'query'>) => UseQueryResponse<T>,
  args: Omit<UseQueryArgs<V>, 'query'> & {
    getArrayOfData: (data: UseQueryState<T>['data']) => D[] | undefined;
    hasAppliedFilters: boolean;
  },
) => {
  const [{ fetching, stale, data, error, extensions }, refetch] = useQuery(
    args,
  );

  const asArray = args.getArrayOfData(data) || [];
  let status: Status;

  if (asArray.length === 0 && args.hasAppliedFilters) {
    status = 'no-data-found-with-those-filters';
  } else if (asArray.length === 0) {
    status = 'no-data-of-any-type-found';
  } else {
    status = 'has-data';
  }

  const handleDataStatuses = (
    statusMap: { [K in Status]: React.ReactNode },
  ) => {
    return statusMap[status] || null;
  };

  return {
    data,
    status,
    fetching,
    stale,
    error,
    extensions,
    dataAsArray: asArray,
    refetch,
    handleDataStatuses,
  };
};
