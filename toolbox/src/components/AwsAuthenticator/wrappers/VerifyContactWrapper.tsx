import Auth from '@aws-amplify/auth';
import React, { useState } from 'react';
import { useAuthenticationContext } from '../AwsAuthenticatorContext';
import {
  AwsAuthComponents,
  AwsAttributeToVerify,
} from '../awsAuthenticatorTypes';
import { useApiState } from '../useApiState';

export const VerifyContactWrapper: React.FC<{
  render: AwsAuthComponents['verifyContact'];
}> = ({ render }) => {
  const { setAuthState, user } = useAuthenticationContext();
  const [state, dispatch] = useApiState();
  const [currentStep, setCurrentStep] = useState<
    'noCodeSent' | 'codeHasBeenSent'
  >('noCodeSent');

  const attributeToVerify = Object.keys(
    (user as any)?.unverified,
  )[0] as AwsAttributeToVerify;

  const beginVerify = () => {
    dispatch({ type: 'reportLoading' });
    Auth.verifyCurrentUserAttribute(attributeToVerify)
      .then(() => {
        dispatch({ type: 'reportComplete' });
        setCurrentStep('codeHasBeenSent');
      })
      .catch((err) => dispatch({ type: 'reportError', err }));
  };

  const submitVerify = ({ code }: { code: string }) => {
    dispatch({ type: 'reportLoading' });
    Auth.verifyCurrentUserAttributeSubmit(attributeToVerify, code)
      .then((data) => {
        dispatch({ type: 'reportComplete' });
        setAuthState('signedIn', user);
      })
      .catch((err) => dispatch({ type: 'reportError', err }));
  };

  const Component = render;

  return (
    <Component
      apiState={state}
      attributeToVerify={attributeToVerify}
      currentStep={currentStep}
      beginVerify={beginVerify}
      submitVerify={submitVerify}
    ></Component>
  );
};
