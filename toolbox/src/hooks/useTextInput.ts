import { useState, ChangeEvent } from 'react';
import { useThrottleUserInput } from './useThrottle';

interface UseTextInputParams {
  defaultValue?: string;
  throttleInMs?: number;
}

export const useTextInput = (
  params: UseTextInputParams = { defaultValue: '', throttleInMs: 200 },
) => {
  const [value, setValue] = useState(params.defaultValue);
  const { throttle } = useThrottleUserInput({
    throttleInMs: params.throttleInMs,
  });
  const [throttledValue, setThrottledValue] = useState('');
  return {
    inputProps: {
      value,
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value || '';
        setValue(newValue);
        throttle(() => {
          setThrottledValue(newValue);
        });
      },
    },
    throttledValue,
  };
};
