import useFsmReducer, { UseFsmReducerEffects } from './useFsmReducer';
import { parseAwsError } from '../components/AwsAuthenticator/parseAwsError';
import Auth from '@aws-amplify/auth';

type State =
  | {
      type: 'initial';
      errorMessage?: string;
    }
  | {
      type: 'loading';
    };

type Action =
  | {
      type: 'dispatchChangePassword';
      oldPassword: string;
      newPassword: string;
    }
  | {
      type: 'reportSuccess';
    }
  | {
      type: 'reportError';
      error: Error;
    };

type Effect =
  | {
      type: 'changePassword';
      oldPassword: string;
      newPassword: string;
    }
  | {
      type: 'onSuccess';
    };

const useLogic = ({
  effects,
}: {
  effects: UseFsmReducerEffects<Action, Effect>;
}) =>
  useFsmReducer<State, Action, Effect>({
    initialState: { type: 'initial' },
    runEffectsOnMount: [],
    states: {
      initial: {
        on: {
          dispatchChangePassword: (state, { newPassword, oldPassword }) => {
            return {
              type: 'loading',
              effects: [{ type: 'changePassword', newPassword, oldPassword }],
            };
          },
        },
      },
      loading: {
        on: {
          reportError: (state, action) => {
            return {
              type: 'initial',
              errorMessage: parseAwsError(action.error),
            };
          },
          reportSuccess: () => {
            return {
              type: 'initial',
              effects: [{ type: 'onSuccess' }],
            };
          },
        },
      },
    },
    effects,
  });

interface UseAwsChangePasswordParams {
  onSuccess?: () => void;
}

/**
 * The current logged-in user can use this hook
 * to change their password
 */
export const useAwsChangePassword = ({
  onSuccess = () => {},
}: UseAwsChangePasswordParams) => {
  const [state, dispatch] = useLogic({
    effects: {
      changePassword: async ({ dispatch, effect }) => {
        try {
          const user = await Auth.currentAuthenticatedUser();
          await Auth.changePassword(
            user,
            effect.oldPassword,
            effect.newPassword,
          );
          dispatch({ type: 'reportSuccess' });
        } catch (e) {
          dispatch({ type: 'reportError', error: e });
        }
      },
      onSuccess,
    },
  });
  return {
    state,
    changePassword: ({
      oldPassword,
      newPassword,
    }: {
      oldPassword: string;
      newPassword: string;
    }) =>
      dispatch({ type: 'dispatchChangePassword', oldPassword, newPassword }),
  };
};
