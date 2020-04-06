import React from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';
import { usePagination } from '../../hooks/usePagination';
import { withKnobs, number, boolean, color } from '@storybook/addon-knobs';

export default { title: 'Pagination', decorators: [withKnobs] };

const PaginationContainer = styled.div`
  height: 120px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

export const PaginationStory = () => {
  const {
    page,
    useWatchAllResultsCount,
    totalPages,
    pageDisplayValue,
    goToPage,
    goToPrevPage,
    goToNextPage,
    canGoToTheNextPage,
    canGoToThePreviousPage,
  } = usePagination({
    resultsPerPage: 10,
  });

  const numberOfPagesKnob = number('Pages', 12);

  const showButtons = boolean('Buttons', true);
  const showNumbers = boolean('Page Numbers', true);
  const showInput = boolean('Number Input', true);
  const buttonColor = color('Button color', '#0FD9B9');

  useWatchAllResultsCount(numberOfPagesKnob * 10);

  return (
    <PaginationContainer>
      <div>Current Page Number: {page}</div>
      <div>Current Display Number: {pageDisplayValue}</div>
      <Pagination.Wrapper
        currentPage={page}
        canGoToTheNextPage={canGoToTheNextPage}
        canGoToThePreviousPage={canGoToThePreviousPage}
        totalPages={totalPages}
        goToPage={goToPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        pageDisplayValue={pageDisplayValue}
        buttonColor={buttonColor}
      >
        {showButtons && <Pagination.PrevButton />}
        {showNumbers && <Pagination.PageNumbers />}
        {showButtons && <Pagination.NextButton />}
        {showInput && <Pagination.TextInput />}
      </Pagination.Wrapper>
      {/* <Pagination
        currentPage={page}
        canGoToTheNextPage={canGoToTheNextPage}
        canGoToThePreviousPage={canGoToThePreviousPage}
        totalPages={totalPages}
        goToPage={goToPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        hideAllPageNumbers={true}
        pageDisplayValue={pageDisplayValue}
        buttonColor="#282D4E"
      />
      <Pagination
        currentPage={page}
        canGoToTheNextPage={canGoToTheNextPage}
        canGoToThePreviousPage={canGoToThePreviousPage}
        totalPages={totalPages}
        goToPage={goToPage}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        pageDisplayValue={pageDisplayValue}
        hideAllPageNumbers
        hideArrows
        buttonColor="#E76581"
      /> */}
    </PaginationContainer>
  );
};
