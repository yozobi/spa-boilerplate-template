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
  const totalIndexPages = totalPages - 1;

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

  const canGoToTheNextPage = page !== totalIndexPages;
  const canGoToThePreviousPage = page !== 0;

  const goToPage = (pageIndexNumber: number) => {
    // If the input number falls within the valid range of pages set it.
    // If the input is over the valid number of pages set it to the last valid page
    // otherwise set the page to the first valid page
    if (pageIndexNumber >= 0 && pageIndexNumber <= totalPages) {
      setPage(pageIndexNumber);
    } else if (pageIndexNumber >= totalIndexPages) {
      setPage(totalIndexPages);
    } else {
      setPage(0);
    }
  };

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

  useEffect(() => {
    if (page + 1 > totalPages) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

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
    // Duplicated prop to help it fit with the Pagination comp
    currentPage: page,
    goToPage,
    goToNextPage,
    goToPrevPage,
    resetPage,
    useWatchAllResultsCount,
    totalPages,
    /**
     * Human-readable display of the page number
     * for showing to users
     */
    pageDisplayValue: page + 1,
  };
};
