import React from 'react';
import useFsmReducer from '../../hooks/useFsmReducer';

export const AutomaticTrafficLightsExample = () => {
  const [state] = useLogic();
  return (
    <div className="grid grid-cols-1 gap-8 p-6">
      <div>
        <h1 className="mb-2 text-2xl font-extrabold text-gray-900">
          Automatic Traffic Light Example
        </h1>
        <p className="text-lg text-gray-700">
          Effects are fired automatically to move it to the next state after a
          duration.
        </p>
      </div>
      {state.type === 'red' && (
        <div className="w-32 h-32 bg-red-600 rounded-full" />
      )}
      {(state.type === 'orange' || state.type === 'flashingOrange') && (
        <div className="w-32 h-32 bg-orange-500 rounded-full" />
      )}
      {state.type === 'green' && (
        <div className="w-32 h-32 bg-green-500 rounded-full" />
      )}
      <div>
        <pre>{JSON.stringify({ state }, null, 2)}</pre>
      </div>
    </div>
  );
};

type State =
  | {
      type: 'red';
    }
  | {
      type: 'orange';
    }
  | {
      type: 'flashingOrange';
    }
  | {
      type: 'green';
    };

type Action = {
  type: 'next';
};

type Effect =
  | {
      type: 'moveToNextIn800Ms';
    }
  | {
      type: 'moveToNextIn2s';
    };

const useLogic = () =>
  useFsmReducer<State, Action, Effect>({
    initialState: { type: 'red' },
    runEffectsOnMount: [{ type: 'moveToNextIn800Ms' }],
    effects: {
      /**
       * Effects are things you would call in a useEffect,
       * and they behave in exactly the same way
       */
      moveToNextIn800Ms: ({ dispatch }) => {
        const timeout = setTimeout(() => {
          dispatch({ type: 'next' });
        }, 800);
        /** If the component unmounts, we want to clear the timeout */
        return () => {
          clearTimeout(timeout);
        };
      },
      moveToNextIn2s: ({ dispatch }) => {
        const timeout = setTimeout(() => {
          dispatch({ type: 'next' });
        }, 2000);
        /** If the component unmounts, we want to clear the timeout */
        return () => {
          clearTimeout(timeout);
        };
      },
    },
    states: {
      red: {
        on: {
          next: () => {
            return {
              type: 'flashingOrange',
              effects: [{ type: 'moveToNextIn800Ms' }],
            };
          },
        },
      },
      flashingOrange: {
        on: {
          next: () => {
            return {
              type: 'green',
              effects: [{ type: 'moveToNextIn2s' }],
            };
          },
        },
      },
      green: {
        on: {
          next: () => {
            return {
              type: 'orange',
              effects: [{ type: 'moveToNextIn800Ms' }],
            };
          },
        },
      },
      orange: {
        on: {
          next: () => {
            return {
              type: 'red',
              effects: [{ type: 'moveToNextIn2s' }],
            };
          },
        },
      },
    },
  });
