import { AuthState } from './awsAuthenticatorTypes';
import { CognitoUser } from '@aws-amplify/auth';
import { createContext, useContext } from 'react';

export type AuthenticationContextType = {
  authState: AuthState;
  onLogInSuccess?: () => void;
  onUserNotConfirmedException?: (username: string) => void;
  setAuthState: (
    authState: AuthState,
    user?: CognitoUser | { username: string },
  ) => void;
  user?: CognitoUser | { username: string };
} | null;

export const AuthenticationContext = createContext<AuthenticationContextType>(
  null,
);

export const useAuthenticationContext = () => {
  const result = useContext(AuthenticationContext);
  if (result === null) {
    throw new Error(
      'You are using useAuthenticationContext outside the scope of an AuthenticationContextProvider',
    );
  }
  return result;
};
