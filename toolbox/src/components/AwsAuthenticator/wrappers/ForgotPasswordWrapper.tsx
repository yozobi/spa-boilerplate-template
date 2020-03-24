import Auth from '@aws-amplify/auth';
import React from 'react';
import useFsmReducer from 'use-fsm-reducer';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';
import { AwsAuthComponents, AwsDeliveryType } from '../awsAuthenticatorTypes';
import { useApiState } from '../useApiState';

type State =
  | { type: 'yetToSendRequest' }
  | { type: 'codeSent'; delivery: AwsDeliveryType };

type Action = {
  type: 'reportCodeSent';
  delivery: AwsDeliveryType;
};

const useForgotPasswordState = () =>
  useFsmReducer<State, Action>({
    initialState: {
      type: 'yetToSendRequest',
    },
    states: {
      yetToSendRequest: {
        on: {
          reportCodeSent: (state, action) => {
            return {
              type: 'codeSent',
              delivery: action.delivery,
            };
          },
        },
      },
    },
  });

export const ForgotPasswordWrapper: React.FC<{
  render: AwsAuthComponents['forgotPassword'];
}> = ({ render }) => {
  const { setAuthState } = useAuthenticationContext();
  const [state, dispatch] = useForgotPasswordState();
  const [apiState, apiDispatch] = useApiState();

  const sendCode = ({ username }: { username: string }) => {
    apiDispatch({ type: 'reportLoading' });
    return Auth.forgotPassword(username)
      .then((data) => {
        dispatch({
          type: 'reportCodeSent',
          delivery: data.CodeDeliveryDetails,
        });
        apiDispatch({ type: 'reportComplete' });
      })
      .catch((err) => apiDispatch({ type: 'reportError', err }));
  };
  const submitNewPassword = ({
    username,
    code,
    password,
  }: {
    username: string;
    code: string;
    password: string;
  }) => {
    apiDispatch({ type: 'reportLoading' });
    return Auth.forgotPasswordSubmit(username, code, password)
      .then((data) => {
        apiDispatch({ type: 'reportComplete' });
        setAuthState('signIn');
      })
      .catch((err) => apiDispatch({ type: 'reportError', err }));
  };

  const Component = render;

  return (
    <Component
      delivery={state.type === 'codeSent' ? state.delivery : undefined}
      goToSignIn={() => setAuthState('signIn')}
      apiState={apiState}
      codeState={state.type}
      sendCode={sendCode}
      submitNewPassword={submitNewPassword}
    />
  );
};
