import { UseQueryArgs, UseQueryResponse, UseQueryState } from 'urql';
import { useState } from 'react';
import { useThrottleUserInput } from './useThrottle';

export interface UseAsyncSearchSelectParams<V, Q, O> {
  useQuery: (args: Omit<UseQueryArgs<V>, 'query'>) => UseQueryResponse<Q>;
  resultAccessor: (result: UseQueryState<Q>) => O[];
  makeVariablesFromInput: (input: string) => V;
  initialOption?: O;
}

/**
 * Works well with the SelectBase component - allows
 * you to easily add async logic to it.
 */
export const useAsyncSearchSelect = <V, Q, O>({
  makeVariablesFromInput,
  resultAccessor,
  useQuery,
  initialOption,
}: UseAsyncSearchSelectParams<V, Q, O>) => {
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

  /**
   * Returns a set of props you can pass directly
   * to your SelectBase comp
   */
  return {
    options: [
      // Include initial option
      ...(initialOption && !hasChangedInput ? [initialOption] : []),
      ...resultAccessor(result),
    ],
    onInputChange: (text: string) => changeInput(text),
  };
};
