import { UseQueryState } from 'urql';
import { useState, useEffect } from 'react';

type Status =
  | 'no-data-of-any-type-found'
  | 'awaiting-first-fetch'
  | 'awaiting-refetch'
  | 'has-data'
  | 'no-data-found-with-those-filters'
  | 'has-errored';

/**
 * Using data statuses with Urql allows us to be sure that we're covering
 * every possible outcome of our data fetch. We need to cover pending,
 * success, and three types of failures.
 */
export const useDataStatuses = <T>(
  result: UseQueryState<T>,
  params: {
    hasData: (data: UseQueryState<T>['data']) => boolean;
    hasAppliedFilters: boolean;
  },
) => {
  const [hasCompletedFirstFetch, setHasCompletedFirstFetch] = useState(false);

  const hasData = params.hasData(result.data);
  let status: Status;

  if (result.fetching && !hasData && !hasCompletedFirstFetch) {
    status = 'awaiting-first-fetch';
  } else if (!hasData && params.hasAppliedFilters) {
    status = 'no-data-found-with-those-filters';
  } else if (!hasData && !result.fetching) {
    status = 'no-data-of-any-type-found';
  } else if (result.error) {
    status = 'has-errored';
  } else if (result.fetching && !hasData) {
    status = 'awaiting-refetch';
  } else {
    status = 'has-data';
  }

  useEffect(() => {
    if (status !== 'awaiting-first-fetch') {
      setHasCompletedFirstFetch(true);
    }
  }, [status]);

  const handleDataStatuses = (
    statusMap: { [K in Status]?: React.ReactNode },
  ) => {
    return statusMap[status] || null;
  };
  return { status, handleDataStatuses };
};
