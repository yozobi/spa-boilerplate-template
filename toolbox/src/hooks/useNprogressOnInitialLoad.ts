import nprogress from 'nprogress';
import { useEffect, useState } from 'react';

export const useNprogressOnInitialLoad = (
  { loaded, disabled }: { disabled?: boolean; loaded: boolean },
  deps: any[],
) => {
  const [hasStarted, setHasStarted] = useState(false);
  useEffect(() => {
    if (!hasStarted && !disabled) {
      nprogress.start();
      setHasStarted(true);
    }
    if (!loaded) {
      nprogress.inc();
    } else {
      nprogress.done();
    }
  }, [disabled, loaded, ...deps]);
};
