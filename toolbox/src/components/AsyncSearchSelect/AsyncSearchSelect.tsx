import React, { useState } from 'react';
import { UseQueryArgs, UseQueryResponse, UseQueryState } from 'urql';
import SelectBase, { SelectBaseProps } from '../SelectBase/SelectBase';
import { useThrottleUserInput } from '../../hooks/useThrottle';

interface AsyncSearchSelectProps<V, Q, O>
  extends Omit<SelectBaseProps<O>, 'options'> {
  useQuery: (args: Omit<UseQueryArgs<V>, 'query'>) => UseQueryResponse<Q>;
  resultAccessor: (result: UseQueryState<Q>) => O[];
  makeVariablesFromInput: (input: string) => V;
  initialOption?: O;
}

export function AsyncSearchSelect<V, Q, O>({
  useQuery,
  resultAccessor,
  makeVariablesFromInput,
  labelAccessor,
  valueAccessor,
  initialOption,
  ...props
}: AsyncSearchSelectProps<V, Q, O>) {
  const [inputText, setInputText] = useState('');
  const [hasChangedInput, setHasChangedInput] = useState(false);
  const [result] = useQuery({
    pause: !inputText,
    variables: makeVariablesFromInput(inputText),
  });
  const { throttle } = useThrottleUserInput({
    throttleInMs: 200,
    allowInstantFirstTry: false,
  });

  const changeInput = (text: string) => {
    if (text !== inputText && !hasChangedInput) {
      setHasChangedInput(true);
    }
    throttle(() => setInputText(text));
  };

  return (
    <SelectBase
      {...props}
      options={[
        // Include initial option
        ...(initialOption && !hasChangedInput ? [initialOption] : []),
        ...resultAccessor(result),
      ]}
      labelAccessor={labelAccessor}
      valueAccessor={valueAccessor}
      value={props.value}
      onInputChange={(text) => changeInput(text)}
    />
  );
}

export default AsyncSearchSelect;
