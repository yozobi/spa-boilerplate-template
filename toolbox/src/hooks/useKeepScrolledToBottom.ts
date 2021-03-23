import { useEffect, useRef } from 'react';

/**
 * Keeps an element scrolled to the bottom,
 * whenever the dependencies change
 */
export const useKeepScrolledToBottom = (
  deps: any[],
  opts?: {
    behavior?: 'auto' | 'smooth';
  },
) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current && 'scrollTo' in ref.current) {
      ref.current?.scrollTo({ top: 20000, behavior: opts?.behavior });
    }
  }, [ref.current, ...deps]);

  return ref;
};
