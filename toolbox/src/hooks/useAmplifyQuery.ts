import API from '@aws-amplify/api';
import useFsmReducer, { UseFsmReducerEffects } from './useFsmReducer';
import { parseAwsError } from '../components/AwsAuthenticator/parseAwsError';

export type UseAmplifyQueryState<Data, Values> =
  | {
      type: 'initial';
    }
  | {
      type: 'pending';
      /** Possibly stale data */
      data?: Data;
      paginationToken?: string;
      previousValues: Values;
    }
  | {
      type: 'success';
      data: Data;
      paginationToken?: string;
      previousValues: Values;
    }
  | {
      type: 'errored';
      errorMessage: string;
    };

type Action<Data, Values> =
  | {
      type: 'send';
      values: Values;
    }
  | {
      type: 'reportSuccess';
      data: Data;
      paginationToken?: string;
    }
  | {
      type: 'reportError';
      error: Error;
    };

type Effect<Values> = {
  type: 'dispatchSend';
  values: Values;
};

const useLogic = <Data = any, Values extends {} = any>({
  effects,
}: {
  effects: UseFsmReducerEffects<Action<Data, Values>, Effect<Values>>;
}) =>
  useFsmReducer<
    UseAmplifyQueryState<Data, Values>,
    Action<Data, Values>,
    Effect<Values>
  >({
    initialState: { type: 'initial' },
    on: {
      send: (state, action) => {
        let data;
        let paginationToken;
        if (state.type === 'success') {
          data = state.data;
          paginationToken = state.paginationToken;
        }
        return {
          type: 'pending',
          previousValues: action.values,
          paginationToken,
          data,
          effects: [{ type: 'dispatchSend', values: action.values }],
        };
      },
    },
    states: {
      pending: {
        on: {
          reportError: (state, action) => {
            return {
              type: 'errored',
              errorMessage: parseAwsError(action.error),
            };
          },
          reportSuccess: (state, action) => {
            return {
              type: 'success',
              previousValues: state.previousValues,
              data: action.data,
              paginationToken: action.paginationToken,
            };
          },
          /**
           * Do nothing on send while in pending mode
           */
          send: (state) => {
            return {
              type: 'pending',
              previousValues: state.previousValues,
              data: state.data,
              paginationToken: state.paginationToken,
            };
          },
        },
      },
    },
    effects,
  });

type UseAmplifyQueryParams = (
  | {
      method: 'get';
    }
  | {
      method: 'post';
    }
) & {
  path: string;
  apiName: string;
  jwt: string;
};

export const useAmplifyQuery = <Data, Values>(
  params: UseAmplifyQueryParams,
) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: params.jwt,
  };
  const [state, dispatch] = useLogic<Data, Values>({
    effects: {
      dispatchSend: async ({ dispatch, effect }) => {
        try {
          if (params.method === 'get') {
            const { NextToken, ...rest } = await API.get(
              params.apiName,
              params.path,
              {
                headers,
                queryStringParameters: effect.values,
              },
            );
            dispatch({
              type: 'reportSuccess',
              data: rest,
              paginationToken: NextToken,
            });
          } else if (params.method === 'post') {
            const { NextToken, ...rest } = await API.post(
              params.apiName,
              params.path,
              {
                headers,
                body: effect.values,
              },
            );
            dispatch({
              type: 'reportSuccess',
              data: rest,
              paginationToken: NextToken,
            });
          }
        } catch (e) {
          dispatch({
            type: 'reportError',
            error: e?.response?.data?.message || e,
          });
        }
      },
    },
  });

  const send = (values: Values) => {
    dispatch({ type: 'send', values });
  };

  return {
    state,
    send,
  };
};
