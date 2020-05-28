import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      // scrollTo is not implemented in @testing-library/react
      process.env.NODE_ENV !== 'test' &&
      'scrollTo' in window
    ) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
