import React, { useState, useEffect, useMemo, useContext } from 'react';
import styled from 'styled-components';
import HeroIconArrowRight from '../HeroIcons/HeroIconArrowRight';
import HeroIconArrowLeft from '../HeroIcons/HeroIconArrowLeft';
import PaginationUserInput from './PaginationUserInput';

const PaginationBar = styled.nav`
  display: flex;
  align-items: center;
  user-select: none;

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const PageButtonContainer = styled.div<{ hideButtons?: boolean }>`
  align-items: center;
  display: ${(props) => (props.hideButtons ? 'none' : 'flex')};

  & > * + * {
    margin-left: 0.5rem;
  }
`;

const BaseButton = styled.button`
  padding: 0 4px;
  min-width: 2.6rem;
  height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// @ts-ignore
const PageNumberButton = styled(BaseButton)<{
  selected?: boolean;
  buttonColor?: string;
}>`
  transition: border 150ms;
  border: ${(props) =>
    props.selected
      ? `8px solid ${props.buttonColor}`
      : `1px solid ${props.buttonColor}`};
  cursor: pointer;
`;

const PageNavButton = styled(BaseButton)<{
  disabled?: boolean;
  buttonColor?: string;
}>`
  background-color: ${(props) => (props.disabled ? 'none' : props.buttonColor)};
  color: ${(props) => (props.disabled ? '#000' : '#fff')};
  border: ${(props) =>
    props.disabled
      ? '1px solid transparent'
      : `1px solid ${props.buttonColor}`};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};
  transition: background-color 300ms;
`;

const Ellipsis = styled.div`
  padding: 0 4px;
  min-width: 2.6rem;
  height: 2.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:after {
    content: '. . .';
  }
`;

export interface PaginationProps {
  buttonColor?: string;
  buttonClassName?: string;
  totalPages: number;
  currentPage: number;
  pageDisplayValue: number;
  canGoToThePreviousPage: boolean;
  canGoToTheNextPage: boolean;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToPage: (pageNumber: number) => void;
  totalEntries: number;
}

type PaginationContextType =
  | (PaginationProps & {
      moreToShowLeft: boolean;
      moreToShowRight: boolean;
      truncatePageButtons: boolean;
      visiblePageRange: number[];
      totalPageDisplayValue: number;
      setPageNumberValue: (value: number | null) => void;
      pageNumberValue: number | null;
    })
  | null;

const PaginationContext = React.createContext<PaginationContextType>(null);

const Wrapper: React.FC<PaginationProps> = (props) => {
  // Use this value for everything bar in callbacks
  const pageDisplayValue = props.pageDisplayValue;

  // This is the total number of pages indexed from 1 upwards
  const totalPageDisplayValue = props.totalPages;

  // Construct an array of numbers based on totalPageDisplayValue - there must be a better way!
  const allPageButtons = [...Array(totalPageDisplayValue)].map((n, i) =>
    !n ? i + 1 : i + 1,
  );

  // Slice buttonsToShow to remove first and last items to create a new array of numbers that can be truncated
  const buttonsToShow = allPageButtons.slice(1, totalPageDisplayValue - 1);

  // The maximum number of button places we will show is 7
  const buttonLimit = 7;

  // We need to calculate half our button limit in order to calculate our visible range.
  // We subtract two here to account for our two hard-coded values for the first and last pages
  // Going forwards, the number of buttons in the visible range will therefore be 5
  const halfButtonLimit = Math.floor(buttonLimit / 2) - 2;

  // We only truncate the buttons if our total pages are greater than the button limit
  const truncatePageButtons = totalPageDisplayValue > buttonLimit;

  // Here we filter out the items either side of our current page to create a truncated range
  // If we are not truncating because there aren't enough pages to warrant it, no filter
  const visiblePageRange = !truncatePageButtons
    ? buttonsToShow
    : buttonsToShow.filter((page: number) => {
        // Until there are pages to hide to the left of the current page, display an unbroken sequence of pages up to 5
        if (page <= 5 && pageDisplayValue < 5) {
          return page;
        }

        // if there are pages to hide to the left or right show half the button limit to the left and right of the current page
        if (
          page >= pageDisplayValue - halfButtonLimit &&
          page <= pageDisplayValue + halfButtonLimit
        ) {
          return page;
        }

        // On the other side, unless there are pages to hide to the right of the current page,
        // display an unbroken sequence of pages to the final page
        if (
          page >= totalPageDisplayValue - 4 &&
          pageDisplayValue > totalPageDisplayValue - 4
        ) {
          return page;
        }

        return null;
      });

  const { moreToShowLeft, moreToShowRight } = useMemo(() => {
    return {
      moreToShowLeft: pageDisplayValue > 4,
      moreToShowRight: pageDisplayValue < totalPageDisplayValue - 3,
    };
  }, [pageDisplayValue, totalPageDisplayValue]);

  const [pageNumberValue, setPageNumberValue] = useState<number | null>(
    pageDisplayValue,
  );

  // Set our state for conditionally rendering ellispis based on our current page
  useEffect(() => {
    // any update to the current page by input or user selection, sets the current page display value
    if (pageDisplayValue && pageDisplayValue !== pageNumberValue) {
      setPageNumberValue(pageDisplayValue);
    }
  }, [pageDisplayValue, totalPageDisplayValue]);

  return (
    <PaginationBar>
      <PaginationContext.Provider
        value={{
          ...props,
          setPageNumberValue,
          pageNumberValue,
          visiblePageRange,
          totalPageDisplayValue,
          moreToShowLeft,
          truncatePageButtons,
          pageDisplayValue,
          moreToShowRight,
        }}
      >
        {props.children}
      </PaginationContext.Provider>
    </PaginationBar>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (context === null) {
    throw new Error(
      'You are using a pagination component outside of a Pagination.Wrapper',
    );
  }
  return context;
};

const PrevButton = () => {
  const {
    canGoToThePreviousPage,
    goToPrevPage,
    buttonColor,
    buttonClassName,
  } = usePaginationContext();
  return (
    <PageNavButton
      className={buttonClassName}
      disabled={!canGoToThePreviousPage}
      onClick={goToPrevPage}
      buttonColor={buttonColor}
    >
      <HeroIconArrowLeft />
    </PageNavButton>
  );
};

const NextButton = () => {
  const {
    goToNextPage,
    canGoToTheNextPage,
    buttonColor,
    buttonClassName,
  } = usePaginationContext();
  return (
    <PageNavButton
      className={buttonClassName}
      disabled={!canGoToTheNextPage}
      onClick={goToNextPage}
      buttonColor={buttonColor}
    >
      <HeroIconArrowRight />
    </PageNavButton>
  );
};

export type PageNumberButtonType = React.FC<{
  selected?: boolean;
  buttonColor?: string;
  onClick?: () => void;
}>;

const PageNumbers = (props: { Button?: PageNumberButtonType }) => {
  const {
    buttonColor,
    buttonClassName,
    pageDisplayValue,
    goToPage,
    truncatePageButtons,
    moreToShowLeft,
    moreToShowRight,
    totalPageDisplayValue,
    visiblePageRange,
  } = usePaginationContext();
  const Button = props.Button || PageNumberButton;
  return (
    <PageButtonContainer>
      <Button
        className={buttonClassName}
        onClick={() => goToPage(0)}
        selected={pageDisplayValue === 1}
        buttonColor={buttonColor}
      >
        1
      </Button>
      {truncatePageButtons && moreToShowLeft && <Ellipsis />}
      {visiblePageRange.map((pageNumber: number) => {
        const selected = pageNumber === pageDisplayValue;
        return (
          <Button
            className={buttonClassName}
            onClick={() => goToPage(pageNumber - 1)}
            selected={selected}
            buttonColor={buttonColor}
            key={pageNumber}
          >
            {pageNumber}
          </Button>
        );
      })}
      {truncatePageButtons && moreToShowRight && <Ellipsis />}
      {totalPageDisplayValue > 1 && (
        <Button
          className={buttonClassName}
          onClick={() => goToPage(totalPageDisplayValue - 1)}
          selected={pageDisplayValue === totalPageDisplayValue}
          buttonColor={buttonColor}
        >
          {totalPageDisplayValue}
        </Button>
      )}
    </PageButtonContainer>
  );
};

const TextInput = () => {
  const {
    goToPage,
    totalPageDisplayValue,
    pageNumberValue,
    setPageNumberValue,
  } = usePaginationContext();
  return (
    <PaginationUserInput
      goToPage={goToPage}
      setPageNumberValue={setPageNumberValue}
      pageNumberValue={pageNumberValue}
      totalPageDisplayValue={totalPageDisplayValue}
    />
  );
};

export const Pagination = {
  Wrapper,
  TextInput,
  NextButton,
  PrevButton,
  PageNumbers,
};

export default Pagination;
