import React from 'react';
import {
  useAsyncSearchSelect,
  UseAsyncSearchSelectParams,
} from '../../hooks/useAsyncSearchSelect';
import SelectBase, { SelectBaseProps } from '../SelectBase/SelectBase';

export type AsyncSearchSelectProps<V, Q, O> = Omit<
  SelectBaseProps<O>,
  'options'
> &
  UseAsyncSearchSelectParams<V, Q, O>;

export function AsyncSearchSelect<V, Q, O>({
  useQuery,
  resultAccessor,
  makeVariablesFromInput,
  labelAccessor,
  valueAccessor,
  initialOption,
  ...props
}: AsyncSearchSelectProps<V, Q, O>) {
  const { onInputChange, options, isLoading } = useAsyncSearchSelect({
    makeVariablesFromInput,
    resultAccessor,
    useQuery,
    initialOption,
    valueAccessor,
  });
  return (
    <SelectBase
      {...props}
      options={options}
      isLoading={isLoading}
      filterOption={() => true}
      labelAccessor={labelAccessor}
      valueAccessor={valueAccessor}
      value={props.value}
      onInputChange={onInputChange}
    />
  );
}

export default AsyncSearchSelect;
