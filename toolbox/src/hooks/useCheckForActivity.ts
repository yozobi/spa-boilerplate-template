import { useEffect, useState } from 'react';
import createActivityDetector from './createActivityDetector';

export const useCheckForActivity = ({
  timeToIdle,
  onIdle,
  onActive,
  initialState,
}: {
  timeToIdle: number;
  initialState?: 'idle' | 'active';
  onActive?: () => void;
  onIdle?: () => void;
}) => {
  const [state, setState] = useState<'idle' | 'active'>(
    initialState || 'active',
  );
  useEffect(() => {
    const activityDetector = createActivityDetector({ timeToIdle });
    activityDetector.on('idle', () => {
      if (state === 'active') {
        onIdle?.();
      }
      setState('idle');
    });
    activityDetector.on('active', () => {
      if (state === 'idle') {
        onActive?.();
      }
      setState('active');
    });
  }, [timeToIdle]);
  return {
    state,
  };
};
