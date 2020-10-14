import React from 'react';
import styled from 'styled-components';

const PageInput = styled.input`
  padding: 10px;
  margin-right: 0.4rem;
  height: 2.6rem;
  width: 60px;
  text-align: center;
  border: 1px solid #000;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const InputContainer = styled.div<{ hideInput?: boolean }>`
  flex-shrink: 0;
  display: ${(props) => (props.hideInput ? 'none' : 'inline-block')};
`;

interface IPaginationUserInputProps {
  goToPage: (pageNumber: number) => void;
  setPageNumberValue: (value: number | null) => void;
  pageNumberValue: number | null;
  totalPageDisplayValue: number;
  hideTextInput?: boolean;
}

const PaginationUserInput = (props: IPaginationUserInputProps) => {
  const goToPage = () => {
    props.goToPage((props.pageNumberValue || 0) - 1);
  };

  const onEnterKeySubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Reduce page number value by 1 to match page index
      goToPage();
    }
  };
  const inputAriaLabel = `Page ${props.pageNumberValue} of ${props.totalPageDisplayValue}`;

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) =>
    event.target.select();
  return (
    <InputContainer hideInput={props.hideTextInput}>
      <PageInput
        id="page-input"
        onKeyPress={(e) => onEnterKeySubmit(e)}
        onBlur={goToPage}
        type="number"
        min="0"
        max={String(props.totalPageDisplayValue)}
        step={1}
        value={props.pageNumberValue || ''}
        onChange={(e) =>
          props.setPageNumberValue(
            e.target.value ? Number(e.target.value) : null,
          )
        }
        onFocus={handleFocus}
      />
      <span>of {props.totalPageDisplayValue}</span>
      <label htmlFor="page-input" aria-label={inputAriaLabel} />
    </InputContainer>
  );
};

export default PaginationUserInput;
