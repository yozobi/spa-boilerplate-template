import { useRef, useEffect } from 'react';

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
