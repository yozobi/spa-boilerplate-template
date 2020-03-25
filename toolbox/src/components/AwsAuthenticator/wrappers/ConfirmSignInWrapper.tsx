import Auth, { CognitoUser } from '@aws-amplify/auth';
import { JS } from '@aws-amplify/core';
import React from 'react';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';
import { AwsAuthComponents } from '../awsAuthenticatorTypes';
import { useApiState } from '../useApiState';

/** Add QR elements to remove here: */
const cleanCodeRegex = / /g;

export const ConfirmSignInWrapper: React.FC<{
  render: AwsAuthComponents['confirmSignIn'];
}> = ({ render }) => {
  const { setAuthState, user } = useAuthenticationContext();
  const [state, dispatch] = useApiState();
  const checkContact = () => {
    dispatch({ type: 'reportLoading' });
    Auth.verifiedContact(user).then((data) => {
      if (!JS.isEmpty(data.verified)) {
        setAuthState('signedIn', user);
      } else {
        const newUser = Object.assign(user, data);
        setAuthState('verifyContact', newUser);
      }
      dispatch({ type: 'reportComplete' });
    });
  };
  const confirmSignIn = ({ code }: { code: string }) => {
    dispatch({ type: 'reportLoading' });
    Auth.confirmSignIn(
      user,
      code.replace(cleanCodeRegex, ''),
      'SOFTWARE_TOKEN_MFA',
    )
      .then(() => {
        checkContact();
      })
      .catch((err) => dispatch({ type: 'reportError', err }));
  };

  const challengeType = (user as any)?.challengeName as
    | 'SMS_MFA'
    | 'SOFTWARE_TOKEN_MFA'
    | undefined;

  const Component = render;

  return (
    <Component
      confirmSignIn={confirmSignIn}
      challengeType={challengeType}
      apiState={state}
      goToSignIn={() => setAuthState('signIn')}
    />
  );
};
