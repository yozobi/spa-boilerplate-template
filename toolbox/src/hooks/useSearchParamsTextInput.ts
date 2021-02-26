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
  params?: UseSearchParamsTextInputProps,
) => {
  const throttleInMs = params?.throttleInMs || 200;
  const [value, setValue] = useSearchParamsState(id, {
    initialValue: params?.defaultValue,
  });
  const { throttle } = useThrottleUserInput({
    throttleInMs: throttleInMs || 200,
  });
  const [throttledValue, setThrottledValue] = useState(value || '');
  return {
    inputProps: {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || '';
        setValue(newValue);
        const makeChange = () => {
          setThrottledValue(newValue);
          params?.onThrottledInputChange?.(newValue);
        };
        if (throttleInMs || 200) {
          throttle(makeChange);
        } else {
          makeChange();
        }
      },
    },
    throttledValue,
  };
};

interface UseSearchParamsSelectInputProps {
  defaultValue?: string;
  throttleInMs?: number;
  onThrottledInputChange?: (value: string) => void;
}

export const useSearchParamsSelectInput = (
  id: string,
  {
    throttleInMs,
    onThrottledInputChange,
    defaultValue,
  }: UseSearchParamsSelectInputProps = {
    throttleInMs: 200,
  },
) => {
  const [value, setValue] = useSearchParamsState(id, {
    initialValue: defaultValue,
  });
  const { throttle } = useThrottleUserInput({
    throttleInMs: throttleInMs || 200,
  });
  const [throttledValue, setThrottledValue] = useState(value || '');
  return {
    inputProps: {
      inputValue: value,
      onInputChange: (newInputValue: string) => {
        const newValue = newInputValue || '';
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
