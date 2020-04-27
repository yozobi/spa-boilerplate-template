import nprogress from 'nprogress';
import { useEffect, useRef } from 'react';

type State = 'idle' | 'loading' | 'complete';

nprogress.configure({
  showSpinner: false,
});

export const useNprogressOnInitialLoad = (
  { state = 'idle' }: { state: State },
  deps: any[],
) => {
  const lastStateRef = useRef(state);

  useEffect(() => {
    if (lastStateRef.current === 'idle' && state === 'loading') {
      nprogress.start();
    } else if (lastStateRef.current === 'loading' && state === 'complete') {
      nprogress.done();
    } else if (state === 'loading') {
      nprogress.inc();
    }
    lastStateRef.current = state;
  }, [state, ...deps]);
};
