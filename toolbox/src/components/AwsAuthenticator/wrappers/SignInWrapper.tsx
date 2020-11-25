import Auth, { CognitoUser } from '@aws-amplify/auth';
import { JS } from '@aws-amplify/core';
import React from 'react';
import { AwsAuthComponents } from '../awsAuthenticatorTypes';
import { useApiState } from '../useApiState';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';

export const SignInWrapper: React.FC<{
  render: AwsAuthComponents['signIn'];
}> = ({ render }) => {
  const [state, dispatch] = useApiState();
  const {
    setAuthState,
    onUserNotConfirmedException,
  } = useAuthenticationContext();

  const checkContact = (user: CognitoUser) => {
    dispatch({ type: 'reportLoading' });
    Auth.verifiedContact(user).then((data) => {
      if (!JS.isEmpty(data.verified)) {
        setAuthState('signedIn', user);
      } else {
        user = Object.assign(user, data);
        setAuthState('verifyContact', user);
      }
    });
  };

  const signIn = async ({
    password,
    username,
  }: {
    username: string;
    password: string;
  }) => {
    dispatch({ type: 'reportLoading' });
    try {
      const user = await Auth.signIn(username, password);
      if (
        user.challengeName === 'SMS_MFA' ||
        user.challengeName === 'SOFTWARE_TOKEN_MFA'
      ) {
        setAuthState('confirmSignIn', user);
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        setAuthState('requireNewPassword', user);
        // } else if (user.challengeName === 'MFA_SETUP') {
        //   setAuthState('TOTPSetup', user);
      } else {
        checkContact(user);
      }
      dispatch({ type: 'reportComplete' });
    } catch (err) {
      if (
        err.code === 'UserNotConfirmedException' &&
        onUserNotConfirmedException
      ) {
        // setAuthState('confirmSignUp', { username });
        onUserNotConfirmedException(username);
      } else if (err.code === 'PasswordResetRequiredException') {
        setAuthState('forgotPassword', { username });
      } else {
        dispatch({ type: 'reportError', err });
      }
    }
  };
  const Component = render;
  return (
    <Component
      signIn={signIn}
      goToForgottenPassword={() => setAuthState('forgotPassword')}
      apiState={state}
    />
  );
};
