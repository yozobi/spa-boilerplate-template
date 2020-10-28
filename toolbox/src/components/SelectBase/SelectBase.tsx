import React from 'react';
import Select, { Props } from 'react-select';
import styled from 'styled-components';

export const Label = styled.label`
  color: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
`;

export type SelectBaseProps<O = any> = {
  onChange?: (e: { target: { value: string | number; name?: string } }) => void;
  options: O[];
  valueAccessor: (option: O) => string | number;
  labelAccessor: (option: O) => string | JSX.Element;
  displayValue?: any;
  label?: string;
  hint?: string;
  disabled?: boolean;
  isLoading?: boolean;
  error?: string;
  labelClassname?: string;
  value: string | number | undefined;
  placeholder?: string;
  onInputChange?: (newValue: string) => void;
  SelectWrapper?: React.FC;
  filterOption?: (option: { data: O }, rawInput: string) => boolean;
  theme?: Partial<Props['theme']>;
  styles?: Props['styles'];
} & Omit<Props<O>, 'onChange' | 'theme'>;

export function SelectBase<O = any>({
  onChange,
  options = [],
  disabled,
  value,
  label,
  hint,
  error,
  isLoading,
  filterOption,
  onBlur,
  valueAccessor,
  placeholder = 'Select...',
  labelAccessor,
  labelClassname,
  children,
  testID,
  theme,
  SelectWrapper = React.Fragment,
  ...props
}: SelectBaseProps<O>) {
  return (
    <div>
      <SelectWrapper>
        <Select<O>
          {...props}
          onChange={(option) =>
            onChange?.({
              target: { value: valueAccessor(option as O), name: props.name },
            })
          }
          styles={{
            // Fixes the overlapping problem of the component
            menu: (provided) => ({ ...provided, zIndex: 9999 }),
          }}
          isMulti={false}
          noOptionsMessage={({ inputValue }) => {
            if (!inputValue) {
              return 'Search for an option...';
            }
            if (isLoading) {
              return 'Loading...';
            }
            return 'No options found';
          }}
          value={
            props.displayValue ||
            options.find((option) => valueAccessor(option as O) === value) ||
            null
          }
          defaultValue={
            props.defaultValue
              ? options.find(
                  (option) => valueAccessor(option as O) === props.defaultValue,
                )
              : undefined
          }
          filterOption={filterOption as any}
          theme={theme as any}
          placeholder={placeholder}
          options={options}
          isDisabled={disabled}
          getOptionLabel={labelAccessor as Props<O>['getOptionValue']}
          getOptionValue={valueAccessor as Props<O>['getOptionValue']}
          menuPlacement="auto"
        />
        {children}
      </SelectWrapper>
    </div>
  );
}

export default SelectBase;
