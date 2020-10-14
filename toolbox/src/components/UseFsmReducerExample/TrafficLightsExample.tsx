import useFsmReducer from '../../hooks/useFsmReducer';
import React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';

export const TrafficLightsExample = () => {
  const [state, dispatch] = useLogic();
  return (
    <div className="p-6 grid grid-cols-1 gap-8">
      <div>
        <h1 className="text-gray-900 text-2xl font-extrabold mb-2">
          Traffic Light Example
        </h1>
        <p className="text-gray-700 text-lg">
          Press 'next' to move to the next state in the traffic light.
        </p>
      </div>
      {state.type === 'red' && (
        <div className="bg-red-600 w-32 h-32 rounded-full" />
      )}
      {(state.type === 'orange' || state.type === 'flashingOrange') && (
        <div className="bg-orange-500 w-32 h-32 rounded-full" />
      )}
      {state.type === 'green' && (
        <div className="bg-green-500 w-32 h-32 rounded-full" />
      )}
      <div>
        <ButtonBase onClick={() => dispatch({ type: 'next' })}>Next</ButtonBase>
      </div>
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

const useLogic = () =>
  useFsmReducer<State, Action>({
    initialState: { type: 'red' },
    states: {
      red: {
        on: {
          next: () => {
            return {
              type: 'flashingOrange',
            };
          },
        },
      },
      flashingOrange: {
        on: {
          next: () => {
            return {
              type: 'green',
            };
          },
        },
      },
      green: {
        on: {
          next: () => {
            return {
              type: 'orange',
            };
          },
        },
      },
      orange: {
        on: {
          next: () => {
            return {
              type: 'red',
            };
          },
        },
      },
    },
  });
