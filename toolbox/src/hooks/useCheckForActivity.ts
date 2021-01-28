import { useEffect, useState } from 'react';
import createActivityDetector from './createActivityDetector';

/**
 * Uses the createActivityDetector function
 * to check when the user becomes idle on a page
 */
export const useCheckForActivity = ({
  timeToIdle,
  onIdle,
  onActive,
  initialState,
  disabled,
}: {
  /**
   * How long we want it to take before the user
   * is registered as idle
   */
  timeToIdle: number;
  initialState?: 'idle' | 'active';
  /**
   * When the user becomes active after a period of idleness
   */
  onActive?: () => void;
  /**
   * When the user becomes idle after a period of activity
   */
  onIdle?: () => void;
  disabled?: boolean;
}) => {
  const [state, setState] = useState<'idle' | 'active'>(
    initialState || 'active',
  );
  useEffect(() => {
    if (!disabled) {
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

      return () => {
        activityDetector.stop();
      };
    }
  }, [timeToIdle, state, disabled]);
  return {
    state,
  };
};
