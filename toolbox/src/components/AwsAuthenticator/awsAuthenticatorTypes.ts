import { AwsAuthenticatorApiState } from './useApiState';

export type AuthState =
  | 'signedIn'
  | 'pending'
  | 'verifyContact'
  | 'signIn'
  | 'confirmSignIn'
  | 'requireNewPassword'
  // | 'TOTPSetup'
  // | 'confirmSignUp'
  | 'forgotPassword';

export type AwsAttributeToVerify = 'email' | 'phone_number';

export type AwsDeliveryType = {
  AttributeName: AwsAttributeToVerify;
  /** E.g. SMS */
  DeliveryMedium: string;
  /** E.g. an obscured telephone number */
  Destination: string;
};

export interface AwsAuthComponents {
  pending?: React.FC;
  confirmSignIn: React.FC<{
    apiState: AwsAuthenticatorApiState;
    challengeType: 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | undefined;
    confirmSignIn: (params: { code: string }) => void;
    goToSignIn: () => void;
  }>;
  // confirmSignUp: React.FC<{
  //   apiState: AwsAuthenticatorApiState;
  //   confirmSignUpWithCode: (params: { username: string; code: string }) => void;
  //   resendSignUpCode: (params: { username: string }) => void;
  // }>;
  signedIn: React.FC;
  signIn: React.FC<{
    goToForgottenPassword: () => void;
    apiState: AwsAuthenticatorApiState;
    signIn: (params: { password: string; username: string }) => void;
  }>;
  forgotPassword: React.FC<{
    goToSignIn: () => void;
    codeState: 'yetToSendRequest' | 'codeSent';
    apiState: AwsAuthenticatorApiState;
    sendCode: (params: {
      username: string;
      email?: string;
      phone_number?: string;
      clientMetadata?: {};
    }) => Promise<void>;
    delivery: AwsDeliveryType | null | undefined;
    submitNewPassword: (params: {
      username: string;
      code: string;
      password: string;
      clientMetadata?: {};
    }) => Promise<void>;
  }>;
  requireNewPassword: React.FC<{
    apiState: AwsAuthenticatorApiState;
    sendNewPassword: (params: {
      password: string;
      clientMetadata?: {};
    }) => void;
    /**
     * Sometimes, AWS will ask you to verify attributes
     * along with the change password request.
     */
    requiredAttributes: AwsAttributeToVerify[];
  }>;
  verifyContact: React.FC<{
    currentStep: 'noCodeSent' | 'codeHasBeenSent';
    apiState: AwsAuthenticatorApiState;
    beginVerify: () => void;
    submitVerify: (params: { code: string }) => void;
    attributeToVerify: AwsAttributeToVerify | undefined;
  }>;
}
