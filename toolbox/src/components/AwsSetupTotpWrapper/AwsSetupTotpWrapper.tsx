import React from 'react';
import Auth from '@aws-amplify/auth';
import useFsmReducer, { UseFsmReducerEffects } from '../../hooks/useFsmReducer';
import { parseAwsError } from '../AwsAuthenticator/parseAwsError';

type State =
  | { type: 'pendingData' }
  | { type: 'pendingQRCode'; pref: 'NOMFA' | 'TOTP' }
  | {
      type: 'noPreferredMFA';
      pref: 'NOMFA' | 'TOTP';
      qrCode: string;
      apiState: 'idle' | 'loading' | 'error';
      errorMessage?: string;
    }
  | { type: 'MFAConfigured'; apiState: 'idle' | 'loading' }
  | { type: 'errored'; errorMessage: string };

type Action =
  | { type: 'reportPreferredMFA'; pref: 'NOMFA' | 'TOTP' }
  | { type: 'dispatchEnableMFA'; code: string }
  | { type: 'disableMFA' }
  | { type: 'reportError'; error: Error }
  | { type: 'reportSuccess' }
  | { type: 'reportQRCode'; qrCode: string };

type Effect =
  | { type: 'getQRCode' }
  | { type: 'enableMFA'; code: string }
  | { type: 'getPreferredMFA' }
  | { type: 'onEnableSuccess' }
  | { type: 'onDisableSuccess' }
  | { type: 'disableMFA' };

/** Add QR elements to remove here: */
const cleanCodeRegex = / /g;

const useLogic = (effects: UseFsmReducerEffects<Action, Effect>) =>
  useFsmReducer<State, Action, Effect>({
    initialState: {
      type: 'pendingData',
    },
    runEffectsOnMount: [
      {
        type: 'getPreferredMFA',
      },
    ],
    on: {
      reportError: (state, action) => {
        return {
          type: 'errored',
          errorMessage: parseAwsError(action.error),
        };
      },
    },
    states: {
      pendingData: {
        on: {
          reportPreferredMFA: (state, action) => {
            if (action.pref === 'NOMFA') {
              return {
                type: 'pendingQRCode',
                pref: action.pref,
                effects: [{ type: 'getQRCode' }],
              };
            }
            return {
              type: 'MFAConfigured',
              apiState: 'idle',
            };
          },
        },
      },
      pendingQRCode: {
        on: {
          reportQRCode: (state, action) => {
            return {
              qrCode: action.qrCode,
              type: 'noPreferredMFA',
              pref: state.pref,
              apiState: 'idle',
            };
          },
        },
      },
      noPreferredMFA: {
        on: {
          dispatchEnableMFA: (state, action) => {
            if (state.apiState === 'loading') {
              return state;
            }
            return {
              type: 'noPreferredMFA',
              apiState: 'loading',
              pref: state.pref,
              qrCode: state.qrCode,
              effects: [
                {
                  type: 'enableMFA',
                  code: action.code.replace(cleanCodeRegex, ''),
                },
              ],
            };
          },
          reportSuccess: () => {
            return {
              type: 'MFAConfigured',
              apiState: 'idle',
              effects: [{ type: 'onEnableSuccess' }],
            };
          },
          reportError: (state, action) => {
            return {
              type: 'noPreferredMFA',
              apiState: 'error',
              pref: state.pref,
              qrCode: state.qrCode,
              errorMessage: parseAwsError(action.error),
            };
          },
        },
      },
      MFAConfigured: {
        on: {
          disableMFA: (state) => {
            if (state.apiState === 'loading') {
              return state;
            }
            return {
              type: 'MFAConfigured',
              apiState: 'loading',
              effects: [{ type: 'disableMFA' }],
            };
          },
          reportSuccess: () => {
            return {
              type: 'pendingQRCode',
              pref: 'NOMFA',
              effects: [{ type: 'getQRCode' }, { type: 'onDisableSuccess' }],
            };
          },
        },
      },
    },
    effects,
  });

interface AwsSetupTotpWrapperProps {
  onEnableSuccess?: () => void;
  onDisableSuccess?: () => void;
  render: React.FC<AwsSetupTotpComponentProps>;
  clientName: string;
}

export interface AwsSetupTotpComponentProps {
  state: State;
  enableMFA: (params: { code: string }) => void;
  disableMFA: () => void;
}

export const AwsSetupTotpWrapper = ({
  onEnableSuccess,
  onDisableSuccess,
  render,
  clientName,
}: AwsSetupTotpWrapperProps) => {
  const [state, dispatch] = useLogic({
    getPreferredMFA: async ({ dispatch }) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const pref = (await Auth.getPreferredMFA(user, {
          bypassCache: false,
        })) as 'NOMFA' | 'TOTP';
        dispatch({ type: 'reportPreferredMFA', pref });
      } catch (error) {
        dispatch({ type: 'reportError', error });
      }
    },
    getQRCode: async ({ dispatch }) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const secretCode = await Auth.setupTOTP(user);
        const url = `otpauth://totp/${clientName}:${user?.username}?secret=${secretCode}&issuer=${window.location.hostname}`;
        dispatch({ type: 'reportQRCode', qrCode: url });
      } catch (error) {
        dispatch({ type: 'reportError', error });
      }
    },
    enableMFA: async ({ effect, dispatch }) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.verifyTotpToken(user, effect.code);
        await Auth.setPreferredMFA(user, 'TOTP');
        dispatch({ type: 'reportSuccess' });
      } catch (error) {
        dispatch({ type: 'reportError', error });
      }
    },
    disableMFA: async ({ dispatch }) => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        await Auth.setPreferredMFA(user, 'NOMFA');
        dispatch({ type: 'reportSuccess' });
      } catch (error) {
        dispatch({ type: 'reportError', error });
      }
    },
    onEnableSuccess: () => {
      onEnableSuccess?.();
    },
    onDisableSuccess: () => {
      onDisableSuccess?.();
    },
  });

  const Component = render;

  return (
    <Component
      enableMFA={({ code }) => dispatch({ type: 'dispatchEnableMFA', code })}
      disableMFA={() => dispatch({ type: 'disableMFA' })}
      state={state}
    />
  );
};

export default AwsSetupTotpWrapper;
