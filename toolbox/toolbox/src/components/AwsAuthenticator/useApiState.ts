import useFsmReducer from '../../hooks/useFsmReducer';
import { parseAwsError } from './parseAwsError';

export type AwsAuthenticatorApiState =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'error'; errorMessage: string };

type Action =
  | { type: 'reportLoading' }
  | { type: 'reportComplete' }
  | { type: 'reportError'; err: Error };

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
          errorMessage: parseAwsError(action.err),
        };
      },
    },
    states: {},
  });
