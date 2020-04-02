import classNames from 'classnames';
import React, { SelectHTMLAttributes } from 'react';

export interface SelectBaseProps<O>
  extends SelectHTMLAttributes<HTMLSelectElement> {
  options: O[];
  valueAccessor: (option: O) => string | number;
  labelAccessor: (option: O) => string;
  label?: string;
  labelClassname?: string;
  value: string | number;
  placeholder?: string;
  SelectWrapper?: React.FC;
}

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
        <select {...props} value={value} onChange={onChange}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => {
            const optValue = valueAccessor(opt);
            const label = labelAccessor(opt);
            return (
              <option key={optValue} value={optValue}>
                {label}
              </option>
            );
          })}
        </select>
        {children}
      </SelectWrapper>
    </div>
  );
}

export default SelectBase;
