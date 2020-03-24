import useFsmReducer from 'use-fsm-reducer';

export type AwsAuthenticatorApiState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'error'; errorMessage: string };

type Action =
  | { type: 'reportLoading' }
  | { type: 'reportComplete' }
  | { type: 'reportError'; err: Error };

const parseError = (err: Error) => {
  if (typeof err === 'string') {
    return err;
  }
  return err.message ? err.message : JSON.stringify(err);
};

export const useApiState = () =>
  useFsmReducer<AwsAuthenticatorApiState, Action>({
    initialState: {
      type: 'idle',
    },
    on: {
      reportLoading: () => {
        return {
          type: 'loading',
        };
      },
      reportComplete: () => {
        return {
          type: 'idle',
        };
      },
      reportError: (state, action) => {
        return {
          type: 'error',
          errorMessage: parseError(action.err),
        };
      },
    },
    states: {},
  });
