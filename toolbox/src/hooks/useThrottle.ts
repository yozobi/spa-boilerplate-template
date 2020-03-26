import { useRef } from 'react';

interface UseThrottleParams {
  /**
   * How many milliseconds to throttle for
   */
  throttleInMs?: number;
}

/**
 * Returns a 'throttle' function, which can delay
 * execution of a function by a set number of milliseconds.
 *
 * For instance: throttle(() => console.log('Hey!'))
 * will console.log 'Hey!' after a wait.
 *
 * If throttle is called a second time, it will clear
 * the previous throttle and start again.
 *
 * This is perfect for throttling inputs, such as autocompletes.
 */
export const useThrottle = (
  { throttleInMs }: UseThrottleParams = { throttleInMs: 500 },
) => {
  const timeoutRef = useRef<number>();

  return {
    throttle: (func: () => any) => {
      if (typeof timeoutRef.current !== 'undefined') {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(func, throttleInMs);
    },
  };
};
