import { useEffect, useRef } from 'react';

/**
 * Keeps an element scrolled to the bottom,
 * whenever the dependencies change
 */
export const useKeepScrolledToBottom = (deps: any[]) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && 'scrollTo' in ref.current) {
      ref.current?.scrollTo({ top: 20000 });
    }
  }, [ref.current, ...deps]);

  return ref;
};
