import useFsmReducer from 'toolbox/src/hooks/useFsmReducer';
import React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';

export const DataFetchingExample = () => {
  const [state, dispatch] = useLogic();
  return (
    <div className="p-6 grid grid-cols-1 gap-8">
      <div>
        <h1 className="text-gray-900 text-2xl font-extrabold mb-2 tracking-tighter">
          Data Fetching Example
        </h1>
        <p className="text-gray-700 text-lg mb-2" style={{ maxWidth: '60ch' }}>
          Press 'go' to launch a data fetch. Notice that the attributes in the
          state change depending on which state type you're in. Note that 'Go'
          will only work once, because the reducer won't respond to any action
          when it's in the 'success' state.
        </p>
        <p className="text-gray-700 text-lg" style={{ maxWidth: '60ch' }}>
          When you're in the pending state, press 'cancel' to cancel the fetch.
        </p>
      </div>
      <div>
        <ButtonBase
          onClick={() =>
            dispatch({
              type: 'dispatchFetch',
              url: 'https://api.coindesk.com/v1/bpi/currentprice.json',
            })
          }
        >
          Go
        </ButtonBase>
        <ButtonBase
          className="ml-4"
          color="danger"
          onClick={() =>
            dispatch({
              type: 'cancel',
            })
          }
        >
          Cancel
        </ButtonBase>
      </div>
      <div>
        <pre>{JSON.stringify({ state }, null, 2)}</pre>
      </div>
    </div>
  );
};

type State =
  | {
      type: 'idle';
    }
  | {
      type: 'pending';
    }
  | {
      type: 'success';
      data: any;
    };

type Action =
  | {
      type: 'dispatchFetch';
      url: string;
    }
  | {
      type: 'reportSuccess';
      data: any;
    }
  | {
      type: 'cancel';
    };

type Effect = {
  type: 'dispatchFetch';
  url: string;
};

const useLogic = () =>
  useFsmReducer<State, Action, Effect>({
    initialState: { type: 'idle' },
    states: {
      idle: {
        on: {
          dispatchFetch: (state, action) => {
            return {
              type: 'pending',
              effects: [{ type: 'dispatchFetch', url: action.url }],
            };
          },
        },
      },
      pending: {
        on: {
          reportSuccess: (state, action) => {
            return {
              type: 'success',
              data: action.data,
            };
          },
          cancel: () => {
            return {
              type: 'idle',
            };
          },
        },
      },
    },
    effects: {
      dispatchFetch: ({ effect, dispatch }) => {
        const controller = new AbortController();
        const timeout = setTimeout(() => {
          fetch(effect.url, { signal: controller.signal })
            .then((res) => res.json())
            .then((data) => {
              dispatch({ type: 'reportSuccess', data });
            });
        }, 1000);
        /** Abort the fetch if the component unmounts */
        return () => {
          controller.abort();
          clearTimeout(timeout);
        };
      },
    },
  });
