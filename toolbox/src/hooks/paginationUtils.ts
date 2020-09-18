import { PaginationProps } from '../components/Pagination/Pagination';

export const mockPagination = <T>(
  data: T[],
  pageCount: number,
): PaginationProps => {
  return {
    canGoToThePreviousPage: false,
    canGoToTheNextPage: true,
    currentPage: 0,
    goToNextPage: () => {},
    goToPage: () => {},
    goToPrevPage: () => {},
    pageDisplayValue: 1,
    totalEntries: data.length,
    totalPages: pageCount,
  };
};
