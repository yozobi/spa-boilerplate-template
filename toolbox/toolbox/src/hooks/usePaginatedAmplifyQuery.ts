import { useEffect } from 'react';
import useFsmReducer, { UseFsmReducerEffects } from './useFsmReducer';
import { UseAmplifyQueryState } from './useAmplifyQuery';
import { useThrottleUserInput as useThrottle } from './useThrottle';

/**
 * Similar to useAmplifyQuery, but works with pagination tokens
 *
 * @deprecated use XState instead
 */
export const usePaginatedAmplifyQuery = <Data, Values>({
  useQuery,
  getParams,
}: {
  useQuery: () => {
    send: (values: Values) => void;
    state: UseAmplifyQueryState<Data, Values>;
  };
  getParams: (values: { paginationToken?: string }) => Values;
}) => {
  const { state: apiState, send } = useQuery();

  const paginationToken =
    apiState.type === 'success' ? apiState.paginationToken : undefined;

  const [pageState, dispatch] = useLogic<Data>({
    effects: {
      checkIfWeHavePaginationToken: ({ dispatch }) => {
        if (paginationToken) {
          dispatch({ type: 'reportPaginationTokenPresent' });
        } else {
          dispatch({ type: 'reportNoPaginationToken' });
        }
      },
      fetchDataWithToken: () => {
        send(getParams({ paginationToken }));
      },
      fetchDataWithoutToken: () => {
        send(getParams({}));
      },
    },
  });

  const { throttle } = useThrottle({ allowInstantFirstTry: true });

  useEffect(() => {
    throttle(() => dispatch({ type: 'reset' }));
  }, [JSON.stringify(getParams({}))]);

  useEffect(() => {
    if (apiState.type === 'success') {
      dispatch({
        type: 'reportSuccess',
        newData: apiState.data,
      });
    }
  }, [apiState.type]);

  const canGoToThePreviousPage =
    pageState.page !== 0 && apiState.type === 'success';
  const canGoToTheNextPage =
    Boolean(paginationToken) ||
    Boolean(pageState.cachedData[pageState.page + 1]);

  const resetPage = () =>
    dispatch({
      type: 'reset',
    });

  const goToPrevPage = () => {
    if (canGoToThePreviousPage) {
      dispatch({ type: 'goToPrevPage' });
    }
  };

  const goToNextPage = () => {
    if (canGoToTheNextPage) {
      dispatch({ type: 'goToNextPage' });
    }
  };

  const data = pageState.cachedData[pageState.page];

  return {
    resetPage,
    canGoToTheNextPage,
    goToNextPage,
    isPending: pageState.type === 'pending',
    data,
    goToPrevPage,
    canGoToThePreviousPage,
    /**
     * Human-readable display of the page number
     * for showing to users
     */
    pageDisplayValue: pageState.page + 1,
  };
};

type State<Data> =
  | {
      type: 'idle';
      page: number;
      cachedData: { [page: number]: Data | undefined };
    }
  | {
      type: 'pending';
      page: number;
      targetPage: number;
      cachedData: { [page: number]: Data | undefined };
    }
  | {
      type: 'checkingPaginationToken';
      page: number;
      cachedData: { [page: number]: Data | undefined };
    };

type Action<Data> =
  | {
      type: 'reportSuccess';
      newData: Data;
    }
  | {
      type: 'goToNextPage';
    }
  | {
      type: 'reset';
    }
  | {
      type: 'reportPaginationTokenPresent';
    }
  | {
      type: 'reportNoPaginationToken';
    }
  | {
      type: 'goToPrevPage';
    };

type Effect =
  | {
      type: 'fetchDataWithoutToken';
    }
  | {
      type: 'fetchDataWithToken';
    }
  | {
      type: 'checkIfWeHavePaginationToken';
    };

const useLogic = <Data>({
  effects,
}: {
  effects: UseFsmReducerEffects<Action<Data>, Effect>;
}) =>
  useFsmReducer<State<Data>, Action<Data>, Effect>({
    initialState: { type: 'idle', cachedData: {}, page: 0 },
    runEffectsOnMount: [],
    on: {
      reset: (state) => {
        return {
          cachedData: {},
          page: state.page,
          type: 'pending',
          targetPage: 0,
          effects: [{ type: 'fetchDataWithoutToken' }],
        };
      },
    },
    states: {
      pending: {
        on: {
          reportSuccess: (state, action) => {
            return {
              type: 'idle',
              page: state.targetPage,
              cachedData: {
                ...state.cachedData,
                [state.targetPage]: action.newData,
              },
            };
          },
        },
      },
      idle: {
        on: {
          goToPrevPage: (state) => {
            if (state.page === 0) {
              return state;
            }
            /**
             * We will never have fire any fetch logic
             * from going backwards.
             */
            return {
              ...state,
              page: state.page - 1,
            };
          },
          goToNextPage: (state) => {
            if (state.cachedData[state.page + 1]) {
              return {
                ...state,
                page: state.page + 1,
              };
            }
            return {
              ...state,
              type: 'checkingPaginationToken',
              effects: [{ type: 'checkIfWeHavePaginationToken' }],
            };
          },
        },
      },
      checkingPaginationToken: {
        on: {
          reportNoPaginationToken: (state) => {
            return {
              ...state,
              type: 'idle',
            };
          },
          reportPaginationTokenPresent: (state) => {
            return {
              ...state,
              type: 'pending',
              page: state.page,
              targetPage: state.page + 1,
              effects: [{ type: 'fetchDataWithToken' }],
            };
          },
        },
      },
    },
    effects,
  });
