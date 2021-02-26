import { useCheckForActivity } from './useCheckForActivity';
import { useEffect } from 'react';
import useFsmReducer from './useFsmReducer';

const DEFAULT_SESSION_TIMEOUT_STORAGE_KEY = 'USER_WAS_LAST_ACTIVE';

interface UseSessionTimeoutParams {
  /**
   * How long the total timeout
   * should be before the user is logged out, in milliseconds
   */
  timeoutInMs: number;
  /**
   * How long we should wait
   * before we consider the user idle. Defaults to 15000 milliseconds
   */
  timeToIdleInMs?: number;
  /**
   * The number of milliseconds before the timeout
   * that the user will be warned that they'll be logged out
   */
  warningThresholdInMs?: number;
  /**
   * We need to run an interval to check if the user is still
   * active every so often. How long between checks should that be?
   * Defaults to 30000 milliseconds (30 seconds)
   */
  checkIntervalInMs?: number;
  /**
   * What to do when we need to warn the user that they're
   * going to be logged out soon
   */
  onWarning?: () => void;
  /**
   * Uh oh, the user's session has timed out. We'd better
   * log them out or something.
   */
  onSessionTimeout: () => void;
  /**
   * This is when the timeout fails because of initial checks,
   * you may want to handle this differently to a genuine timeout
   */
  onInitialSessionTimeout: () => void;
  /**
   * If we want to add a custom localstorage key for timeouts
   */
  localStorageKey?: string;
  /**
   * Disable checking and always report timeout as OK
   */
  disabled?: boolean;
}

type State =
  | { type: 'makingInitialCheck' }
  | { type: 'running'; hasShownWarning: boolean }
  | { type: 'notRunning' };

type Action =
  | { type: 'reportUserIdle'; lastActiveTimestamp: number; disabled: boolean }
  | { type: 'reportUserActive' }
  | { type: 'reportTimeoutExpired' }
  | { type: 'reportTimeoutOK' };

type Effect =
  | {
      type: 'runInitialCheck';
    }
  | {
      type: 'clearLocalStorage';
    }
  | {
      type: 'setLocalStorage';
    }
  | {
      type: 'onTimeout';
    }
  | {
      type: 'onInitialTimeout';
    }
  | {
      type: 'onWarning';
    };

export const useSessionTimeout = ({
  timeToIdleInMs = 15000, // 15 seconds
  checkIntervalInMs = 30000, // 30 seconds
  timeoutInMs = 300000, // five minutes
  localStorageKey = DEFAULT_SESSION_TIMEOUT_STORAGE_KEY,
  onSessionTimeout,
  onWarning,
  onInitialSessionTimeout,
  warningThresholdInMs = 120000, // 2 minutes
  disabled = false,
}: UseSessionTimeoutParams) => {
  const getTimeLastActive = (): number | null => {
    const result = localStorage.getItem(localStorageKey);
    if (result) {
      return Number(result);
    }
    return null;
  };

  const [state, dispatch] = useFsmReducer<State, Action, Effect>({
    initialState: {
      type: 'makingInitialCheck',
    },
    runEffectsOnMount: [
      {
        type: 'runInitialCheck',
      },
    ],
    states: {
      makingInitialCheck: {
        on: {
          reportTimeoutExpired: () => {
            return {
              type: 'notRunning',
              effects: [
                { type: 'clearLocalStorage' },
                { type: 'onInitialTimeout' },
              ],
            };
          },
          reportTimeoutOK: () => {
            return {
              type: 'running',
              hasShownWarning: false,
              effects: [{ type: 'setLocalStorage' }],
            };
          },
        },
      },
      running: {
        on: {
          reportUserActive: () => {
            return {
              type: 'running',
              hasShownWarning: false,
              effects: [{ type: 'setLocalStorage' }],
            };
          },
          reportUserIdle: (state, action) => {
            if (action.disabled) {
              return state;
            }
            const timeLastActive = action.lastActiveTimestamp;
            const currentTime = new Date().getTime();

            const hasTimedOut = currentTime - timeLastActive > timeoutInMs;

            if (hasTimedOut) {
              return {
                type: 'notRunning',
                effects: [{ type: 'clearLocalStorage' }, { type: 'onTimeout' }],
              };
            }

            const shouldDisplayWarning =
              currentTime - timeLastActive + warningThresholdInMs > timeoutInMs;

            if (shouldDisplayWarning && !state.hasShownWarning) {
              return {
                type: 'running',
                hasShownWarning: true,
                effects: [{ type: 'onWarning' }],
              };
            }
            return {
              type: 'running',
              hasShownWarning: false,
            };
          },
        },
      },
    },
    effects: {
      clearLocalStorage: () => {
        localStorage.removeItem(localStorageKey);
      },
      onInitialTimeout: onInitialSessionTimeout,
      onTimeout: onSessionTimeout,
      onWarning: onWarning || (() => {}),
      runInitialCheck: ({ dispatch }) => {
        if (disabled) {
          return dispatch({
            type: 'reportTimeoutOK',
          });
        }
        const lastActiveTimestamp = getTimeLastActive();
        const currentTime = new Date().getTime();
        if (
          lastActiveTimestamp &&
          currentTime - lastActiveTimestamp > timeoutInMs
        ) {
          dispatch({ type: 'reportTimeoutExpired' });
        } else {
          dispatch({ type: 'reportTimeoutOK' });
        }
      },
      setLocalStorage: () => {
        localStorage.setItem(localStorageKey, new Date().getTime().toString());
      },
    },
  });

  const activity = useCheckForActivity({ timeToIdle: timeToIdleInMs });

  useEffect(() => {
    const dispatchStates = () => {
      const lastActiveTimestamp = getTimeLastActive();
      if (activity.state === 'active') {
        dispatch({ type: 'reportUserActive' });
      } else if (lastActiveTimestamp) {
        dispatch({ type: 'reportUserIdle', lastActiveTimestamp, disabled });
      }
    };
    dispatchStates();
    const interval = setInterval(dispatchStates, checkIntervalInMs);
    return () => clearInterval(interval);
  }, [activity.state]);
};
