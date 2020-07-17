import { useState, ChangeEvent } from 'react';
import { useThrottleUserInput } from './useThrottle';
import { useSearchParamsState } from './useSearchParamsState';

interface UseSearchParamsTextInputProps {
  defaultValue?: string;
  throttleInMs?: number;
  onThrottledInputChange?: (value: string) => void;
}

/**
 * This provides a simple hook for dealing with text inputs. By default,
 * it throttles the value passed to it to prevent overfetching, and distinguishes
 * between the throttled value for the API and the live value for the input.
 */
export const useSearchParamsTextInput = (
  id: string,
  {
    throttleInMs,
    onThrottledInputChange,
    defaultValue,
  }: UseSearchParamsTextInputProps = {
    throttleInMs: 200,
  },
) => {
  const [value, setValue] = useSearchParamsState(id, {
    initialValue: defaultValue,
  });
  const { throttle } = useThrottleUserInput({
    throttleInMs: throttleInMs || 200,
  });
  const [throttledValue, setThrottledValue] = useState(value);
  return {
    inputProps: {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || '';
        setValue(newValue);
        const makeChange = () => {
          setThrottledValue(newValue);
          onThrottledInputChange?.(newValue);
        };
        if (throttleInMs) {
          throttle(makeChange);
        } else {
          makeChange();
        }
      },
    },
    throttledValue,
  };
};
