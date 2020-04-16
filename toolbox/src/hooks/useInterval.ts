import { useEffect, useRef } from 'react';

/**
 * Usage:
 *
 * useInterval(() => {
 *   console.log('Hey! ' + name)
 * }, 500, [name])
 */
export const useInterval = (
  func: () => void,
  interval: number,
  deps: any[],
) => {
  const intervalRef = useRef<number>();
  useEffect(() => {
    intervalRef.current = setInterval(func, interval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, deps);
};
