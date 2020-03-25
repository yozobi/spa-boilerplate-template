import Auth, { CognitoUser } from '@aws-amplify/auth';
import React, { useEffect, useState } from 'react';
import { AuthenticationContext } from './AwsAuthenticatorContext';
import { AuthState, AwsAuthComponents } from './awsAuthenticatorTypes';
import { ConfirmSignInWrapper } from './wrappers/ConfirmSignInWrapper';
import { ForgotPasswordWrapper } from './wrappers/ForgotPasswordWrapper';
import { RequireNewPasswordWrapper } from './wrappers/RequireNewPasswordWrapper';
import { SignInWrapper } from './wrappers/SignInWrapper';
import { VerifyContactWrapper } from './wrappers/VerifyContactWrapper';

const SignedInWrapper: React.FC<{ render: AwsAuthComponents['signedIn'] }> = ({
  render,
}) => {
  const Component = render;
  return <Component />;
};

export const AwsAuthenticator: React.FC<{
  components: AwsAuthComponents;
  onLogInSuccess?: () => void;
  checkIsLoggedIn: () => Promise<boolean> | boolean;
}> = ({ components, onLogInSuccess, checkIsLoggedIn }) => {
  const [authState, setAuthState] = useState<AuthState>('pending');
  const [user, setUser] = useState<CognitoUser | { username: string }>();
  /** Check if the user is logged in */
  useEffect(() => {
    const promiseOrBoolean = checkIsLoggedIn();

    /**
     * Slightly strange logic to make
     * sure we can either accept a promise or a boolean
     */
    // @ts-ignore
    if (promiseOrBoolean?.then) {
      (promiseOrBoolean as Promise<boolean>)
        .then((isLoggedIn) => {
          if (isLoggedIn) {
            setAuthState('signedIn');
          } else {
            setAuthState('signIn');
          }
        })
        .catch(() => {
          setAuthState('signIn');
        });
    } else {
      if (promiseOrBoolean) {
        setAuthState('signedIn');
      } else {
        setAuthState('signIn');
      }
    }
  }, []);
  return (
    <AuthenticationContext.Provider
      value={{
        authState,
        setAuthState: (nextAuthState, nextUser) => {
          if (nextUser) {
            setUser(nextUser);
          }
          setAuthState(nextAuthState);
          if (authState !== 'pending' && nextAuthState === 'signedIn') {
            onLogInSuccess?.();
          }
        },
        onLogInSuccess,
        user,
      }}
    >
      {authState === 'pending' && components.pending && <components.pending />}
      {authState === 'signIn' && <SignInWrapper render={components.signIn} />}
      {authState === 'confirmSignIn' && (
        <ConfirmSignInWrapper render={components.confirmSignIn} />
      )}
      {authState === 'forgotPassword' && (
        <ForgotPasswordWrapper render={components.forgotPassword} />
      )}
      {authState === 'requireNewPassword' && (
        <RequireNewPasswordWrapper render={components.requireNewPassword} />
      )}
      {authState === 'verifyContact' && (
        <VerifyContactWrapper render={components.verifyContact} />
      )}
      {authState === 'signedIn' && (
        <SignedInWrapper render={components.signedIn}></SignedInWrapper>
      )}
    </AuthenticationContext.Provider>
  );
};

export default AwsAuthenticator;
