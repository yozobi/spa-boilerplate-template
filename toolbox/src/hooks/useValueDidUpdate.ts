import { useRef, useEffect } from 'react';

/**
 * Checks if a value has updated, and allows
 * you to pass in a handler function
 */
export const useValueDidUpdate = <T>(
  value: T,
  onChange: (prevValue: T, newValue: T) => void,
) => {
  const valueRef = useRef<T>(value);

  useEffect(() => {
    if (value !== valueRef.current) {
      onChange(valueRef.current, value);
    }
    valueRef.current = value;
  }, [value]);
};
