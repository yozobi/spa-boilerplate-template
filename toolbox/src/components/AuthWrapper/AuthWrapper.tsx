import React, { useContext } from 'react';
import useFsmReducer, { UseFsmReducerEffects } from '../../hooks/useFsmReducer';
import Auth, { CognitoUser } from '@aws-amplify/auth';

interface AuthWrapperProps {
  fallback: React.ReactNode;
}

export type AuthWrapperContextType = {
  status: State['type'];
  user?: CognitoUser;
  username?: string;
  idTokenJwt?: string;
  /**
   * This triggers the auth wrapper to check for the
   * user in localStorage.
   */
  refreshAuthState: () => void;
};

const AuthWrapperContext = React.createContext<
  AuthWrapperContextType | undefined
>(undefined);

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  fallback,
}) => {
  const [state, dispatch] = useLogic({
    effects: {
      checkIfUserIsLoggedIn: async ({ dispatch }) => {
        let user: CognitoUser | undefined;
        try {
          user = await Auth.currentAuthenticatedUser();
        } catch (e) {
          user = undefined;
          console.log(e);
        }

        if (user) {
          dispatch({
            type: 'reportUserLoggedIn',
            user,
          });
        } else {
          dispatch({
            type: 'reportUserLoggedOut',
          });
        }
      },
    },
  });

  const refreshAuthState = () => {
    dispatch({ type: 'reportShouldCheckUser' });
  };

  if (state.type === 'pending') {
    return <>{fallback}</>;
  }

  const user = state.type === 'loggedIn' ? state.user : undefined;

  return (
    <AuthWrapperContext.Provider
      value={{
        status: state.type,
        user,
        username: user?.getUsername(),
        idTokenJwt: user
          ?.getSignInUserSession?.()
          ?.getIdToken?.()
          ?.getJwtToken?.(),
        refreshAuthState,
      }}
    >
      {children}
    </AuthWrapperContext.Provider>
  );
};

export const useAuthWrapperContext = () => {
  const value = useContext(AuthWrapperContext);
  if (!value) {
    throw new Error(
      'You are using useAuthWrapperContext outside of an AuthWrapper.',
    );
  }
  return value;
};

export default AuthWrapper;

type State =
  | {
      type: 'loggedIn';
      user: CognitoUser;
    }
  | {
      type: 'loggedOut';
    }
  | {
      type: 'pending';
    };

type Action =
  | {
      type: 'reportUserLoggedOut';
    }
  | {
      type: 'reportUserLoggedIn';
      user: CognitoUser;
    }
  | {
      type: 'reportShouldCheckUser';
    };

type Effect = {
  type: 'checkIfUserIsLoggedIn';
};

const useLogic = ({
  effects,
}: {
  effects: UseFsmReducerEffects<Action, Effect>;
}) =>
  useFsmReducer<State, Action, Effect>({
    initialState: { type: 'pending' },
    runEffectsOnMount: [
      {
        type: 'checkIfUserIsLoggedIn',
      },
    ],
    on: {
      reportUserLoggedIn: (state, action) => {
        return {
          type: 'loggedIn',
          user: action.user,
        };
      },
      reportShouldCheckUser: (state) => {
        return {
          type: 'pending',
          effects: [{ type: 'checkIfUserIsLoggedIn' }],
        };
      },
      reportUserLoggedOut: () => {
        return {
          type: 'loggedOut',
        };
      },
    },
    states: {
      pending: {
        on: {
          reportShouldCheckUser: (state) => state,
        },
      },
      loggedIn: {
        on: {
          reportUserLoggedIn: (state) => state,
        },
      },
      loggedOut: {
        on: {
          reportUserLoggedOut: (state) => state,
        },
      },
    },
    effects,
  });
