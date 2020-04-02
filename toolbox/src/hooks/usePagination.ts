import { useState, useEffect } from 'react';

interface UsePaginationParams {
  resultsPerPage: number;
  /**
   * Initial page to start on - defaults to
   * zero, which shows the first page
   */
  initialPage?: number;
}

export const usePagination = ({
  resultsPerPage,
  initialPage = 0,
}: UsePaginationParams) => {
  const [page, setPage] = useState(initialPage);
  const [totalResults, setTotalResults] = useState(0);

  const totalPages = Math.ceil(totalResults / resultsPerPage) || 1;

  /**
   * YOU MUST USE THIS - it allows this hook
   * to watch for changes in the query
   * response so that it can update properly
   * 
   
    const {
      offset,
      limit,
      useWatchAllResultsCount,
    } = usePagination({ resultsPerPage: 5 });

    const [{ data }] = useUsersPaginatedQuery({
      variables: { limit, offset },
    });

    useWatchAllResultsCount(data?.AllUsers.aggregate?.count);

   */
  const useWatchAllResultsCount = (count: number | null | undefined) => {
    useEffect(() => {
      if (typeof count === 'number') {
        setTotalResults(count || 0);
      }
    }, [count]);
  };

  const canGoToTheNextPage = page !== totalPages - 1;
  const canGoToThePreviousPage = page !== 0;

  const goToNextPage = () => {
    if (canGoToTheNextPage) {
      setPage(page + 1);
    }
  };

  const goToPrevPage = () => {
    if (canGoToThePreviousPage) {
      setPage(page - 1);
    }
  };

  const resetPage = () => {
    setPage(initialPage);
  };

  return {
    /**
     * Useful for feeding directly into the graphql query
     *  - plays very nicely with Hasura
     */
    limit: resultsPerPage,
    /**
     * Useful for feeding directly into the graphql query
     *  - plays very nicely with Hasura
     */
    offset: resultsPerPage * page,
    canGoToThePreviousPage,
    canGoToTheNextPage,
    page,
    goToNextPage,
    goToPrevPage,
    resetPage,
    useWatchAllResultsCount,
    /**
     * Human-readable display of the page number
     * for showing to users
     */
    pageDisplayValue: page + 1,
  };
};
