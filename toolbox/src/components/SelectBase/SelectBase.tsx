import classNames from 'classnames';
import React from 'react';
import Select, { Props } from 'react-select';

export type SelectBaseProps<O> = {
  onChange?: (e: { target: { value: string | number; name?: string } }) => void;
  options: O[];
  valueAccessor: (option: O | undefined) => string | number;
  labelAccessor: (option: O) => string;
  label?: string;
  labelClassname?: string;
  value: string | number;
  placeholder?: string;
  SelectWrapper?: React.FC;
  theme?: Partial<Props['theme']>;
  styles?: Props['styles'];
} & Omit<Props<O>, 'onChange' | 'theme'>;

export function SelectBase<O>({
  onChange,
  options = [],
  value,
  label,
  onBlur,
  valueAccessor,
  placeholder = 'Select...',
  labelAccessor,
  labelClassname,
  children,
  theme,
  SelectWrapper = React.Fragment,
  ...props
}: SelectBaseProps<O>) {
  return (
    <div>
      {label && (
        <label htmlFor={props.name}>
          <span className={classNames('block', labelClassname)}>{label}</span>
        </label>
      )}
      <SelectWrapper>
        <Select<O>
          {...props}
          onChange={(option) =>
            onChange?.({
              target: { value: valueAccessor(option as O), name: props.name },
            })
          }
          isMulti={false}
          value={options.find((option) => valueAccessor(option as O) === value)}
          defaultValue={
            props.defaultValue
              ? options.find(
                  (option) => valueAccessor(option as O) === props.defaultValue,
                )
              : undefined
          }
          theme={theme as any}
          placeholder={placeholder}
          options={options}
          getOptionLabel={labelAccessor}
          getOptionValue={valueAccessor as Props<O>['getOptionValue']}
        />
        {children}
      </SelectWrapper>
    </div>
  );
}

export default SelectBase;
