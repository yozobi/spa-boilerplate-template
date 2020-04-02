import { useRef } from 'react';

interface UseThrottleParams {
  /**
   * How many milliseconds to throttle for
   */
  throttleInMs?: number;
  allowInstantFirstTry?: boolean;
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
  { throttleInMs, allowInstantFirstTry }: UseThrottleParams = {
    throttleInMs: 500,
    allowInstantFirstTry: false,
  },
) => {
  const timeoutRef = useRef<number>();
  const isFirstTryRef = useRef<boolean>(true);

  return {
    throttle: (func: () => any) => {
      if (isFirstTryRef.current && allowInstantFirstTry) {
        isFirstTryRef.current = false;
        func();
        return;
      }
      if (typeof timeoutRef.current !== 'undefined') {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(func, throttleInMs);
    },
  };
};
