import Auth, { CognitoUser } from '@aws-amplify/auth';
import { JS } from '@aws-amplify/core';
import React from 'react';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';
import { AwsAuthComponents } from '../awsAuthenticatorTypes';
import { useApiState } from '../useApiState';

export const RequireNewPasswordWrapper: React.FC<{
  render: AwsAuthComponents['requireNewPassword'];
}> = ({ render }) => {
  const { setAuthState, user } = useAuthenticationContext();
  const [state, dispatch] = useApiState();

  const checkContact = (user: CognitoUser) => {
    Auth.verifiedContact(user).then((data) => {
      if (!JS.isEmpty(data.verified)) {
        setAuthState('signedIn', user);
      } else {
        user = Object.assign(user, data);
        setAuthState('verifyContact', user);
      }
    });
  };

  const sendNewPassword = ({
    password,
    email,
    phone_number,
  }: {
    password: string;
    email?: string;
    phone_number?: string;
  }) => {
    dispatch({ type: 'reportLoading' });
    Auth.completeNewPassword(user, password, {
      ...(email && { email }),
      ...(phone_number && { phone_number }),
    })
      .then((user) => {
        if (user.challengeName === 'SMS_MFA') {
          setAuthState('confirmSignIn', user);
          // } else if (user.challengeName === 'MFA_SETUP') {
          //   setAuthState('TOTPSetup', user);
        } else {
          checkContact(user);
        }
      })
      .catch((err) => dispatch({ type: 'reportError', err }));
  };

  const Component = render;

  const requiredAttributes: ('email' | 'phone_number')[] =
    (user as any)?.challengeParam?.requiredAttributes || [];

  return (
    <Component
      apiState={state}
      sendNewPassword={sendNewPassword}
      requiredAttributes={requiredAttributes}
    />
  );
};
