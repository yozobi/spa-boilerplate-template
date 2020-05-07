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
  isLoggedIn: boolean;
}> = ({ components, onLogInSuccess, isLoggedIn }) => {
  const [authState, setAuthState] = useState<AuthState>('pending');
  const [user, setUser] = useState<CognitoUser | { username: string }>();
  /** Check if the user is logged in */
  useEffect(() => {
    if (isLoggedIn) {
      setAuthState('signedIn');
    } else {
      setAuthState('signIn');
    }
  }, [isLoggedIn]);
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
        <SignedInWrapper render={components.signedIn} />
      )}
    </AuthenticationContext.Provider>
  );
};

export default AwsAuthenticator;
