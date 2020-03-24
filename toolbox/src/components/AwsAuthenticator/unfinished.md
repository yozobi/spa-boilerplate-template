# Signing Up

Here is some code I half-completed, that could be useful if we need public user sign up:

```js
const SignOutWrapper = () => {
  const { setAuthState, handleError } = useAuthenticationContext();

  const signOut = () => {
    Auth.signOut()
      .then(() => {
        setAuthState('signIn');
      })
      .catch((err) => {
        dispatch({ type: 'reportError', err });
      });
  };
  return null;
};

const SignUpWrapper = () => {
  const { setAuthState, handleError } = useAuthenticationContext();
  const [state, dispatch] = useApiState();
  const signUp = <T extends {}>({
    username,
    password,
    attributes,
  }: {
    username: string;
    password: string;
    attributes: T;
  }) => {
    setApiState('loading');
    Auth.signUp({ password, username, attributes } as SignUpParams)
      .then((data) => {
        setApiState('idle');
        setAuthState('confirmSignUp', {
          // @ts-ignore
          username: data.user.username,
        });
      })
      .catch((err) => {
        setApiState('idle');
        return dispatch({ type: 'reportError', err });
      });
  };
};

import React from 'react';
import Auth from '@aws-amplify/auth';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';
import { useApiState } from '../useApiState';
import { AwsAuthComponents } from '../awsAuthenticatorTypes';

export const ConfirmSignUpWrapper: React.FC<{
  render: AwsAuthComponents['confirmSignUp'];
}> = ({ render }) => {
  const { setAuthState } = useAuthenticationContext();
  const [state, dispatch] = useApiState();
  const confirmSignUpWithCode = ({
    username,
    code,
  }: {
    username: string;
    code: string;
  }) => {
    Auth.confirmSignUp(username, code)
      .then(() => setAuthState('signIn'))
      .catch((err) => dispatch({ type: 'reportError', err }));
  };

  const resendSignUpCode = ({ username }: { username: string }) => {
    return Auth.resendSignUp(username).catch((err) =>
      dispatch({ type: 'reportError', err }),
    );
  };

  const Component = render;

  return (
    <Component
      confirmSignUpWithCode={confirmSignUpWithCode}
      apiState={state}
      resendSignUpCode={resendSignUpCode}
    />
  );
};
```
