import { useEffect, useRef } from 'react';

/**
 * A declarative way to use an interval
 *
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
  options?: {
    /**
     * If true, this will call the function immediately
     * whenever deps change
     */
    callOnDepsChange?: boolean;
  },
) => {
  const callOnDepsChange = options?.callOnDepsChange ?? false;
  const intervalRef = useRef<number>();
  useEffect(() => {
    if (callOnDepsChange) {
      func();
    }
    // @ts-ignore
    intervalRef.current = setInterval(func, interval);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, deps);
};
