import { useRef, useState } from 'react';

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
export const useThrottleUserInput = (
  { throttleInMs, allowInstantFirstTry }: UseThrottleParams = {
    throttleInMs: 500,
    allowInstantFirstTry: false,
  },
) => {
  const timeoutRef = useRef<number>();
  const isFirstTryRef = useRef<boolean>(true);
  const [isThrottling, setIsThrottling] = useState(false);

  return {
    throttle: (func: () => any) => {
      if (isFirstTryRef.current && allowInstantFirstTry) {
        isFirstTryRef.current = false;
        func();
        return;
      }
      setIsThrottling(true);
      if (typeof timeoutRef.current !== 'undefined') {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func();
        setIsThrottling(false);
      }, throttleInMs);
    },
    isThrottling,
  };
};

/**
 * This throttle is slightly different to the
 * one above. Instead of waiting for user input to stop,
 * it WILL fire something every 'throttleInMs'. This is
 * good for deduplicating API requests that would otherwise
 * hit the backend too hard
 */
export const useDeduplicationThrottle = (
  params: { throttleInMs: number } = { throttleInMs: 500 },
) => {
  const timeoutRef = useRef<number>();
  const timeLastSent = useRef<number>(new Date().getTime());
  return {
    throttle: (func: () => any) => {
      const differenceInMs = new Date().getTime() - timeLastSent.current;
      if (differenceInMs > params.throttleInMs) {
        timeLastSent.current = new Date().getTime();
        func();
      } else {
        if (typeof timeoutRef.current !== 'undefined') {
          clearTimeout(timeoutRef.current);
        }
        // @ts-ignore
        timeoutRef.current = setTimeout(() => {
          timeLastSent.current = new Date().getTime();
          func();
        }, params.throttleInMs - differenceInMs);
      }
    },
  };
};
