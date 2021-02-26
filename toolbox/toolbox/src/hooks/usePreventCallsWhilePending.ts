import { useRef } from 'react';

/**
 * This wraps a function to prevent calls to it
 * while it's pending. Handy for preventing multiple
 * API calls
 */
export const usePreventCallsWhilePending = <
  Func extends (...args: any[]) => Promise<any>
>(
  func: Func,
): Func => {
  const isPendingRef = useRef<boolean>(false);

  const handler = async (...args: any[]) => {
    if (isPendingRef.current) return;
    isPendingRef.current = true;
    let result;
    let error;
    try {
      result = await func(...args);
    } catch (e) {
      error = e;
    }
    isPendingRef.current = false;

    if (error) throw error;

    return result;
  };

  return handler as any;
};
