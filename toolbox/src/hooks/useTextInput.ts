import { useState, ChangeEvent, useEffect } from 'react';
import { useThrottleUserInput, UseThrottleParams } from './useThrottle';

interface UseTextInputParams {
  defaultValue?: string;
  throttleInMs?: number;
  onThrottledInputChange?: (value: string) => void;
}

/**
 * This provides a simple hook for dealing with text inputs. By default,
 * it throttles the value passed to it to prevent overfetching, and distinguishes
 * between the throttled value for the API and the live value for the input.
 */
export const useTextInput = (
  params: UseTextInputParams = { defaultValue: '', throttleInMs: 200 },
) => {
  const [value, setValue] = useState(params.defaultValue);
  const { throttle } = useThrottleUserInput({
    throttleInMs: params.throttleInMs,
  });
  const [throttledValue, setThrottledValue] = useState(params.defaultValue);
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
        if (params.throttleInMs) {
          throttle(makeChange);
        } else {
          makeChange();
        }
      },
    },
    setValue: (value: string) => {
      setValue(value);
      setThrottledValue(value);
    },
    throttledValue,
  };
};

export const useThrottledValue = <T>(value: T, opts?: UseThrottleParams): T => {
  const [throttledValue, setThrottledValue] = useState(value);

  const { throttle } = useThrottleUserInput(opts);

  useEffect(() => {
    throttle(() => {
      setThrottledValue(value);
    });
  }, [value]);

  return throttledValue;
};
