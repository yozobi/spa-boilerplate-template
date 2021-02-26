import useFsmReducer from '../../hooks/useFsmReducer';
import React from 'react';
import ButtonBase from '../ButtonBase/ButtonBase';

export const TrafficLightsExample = () => {
  const [state, dispatch] = useLogic();
  return (
    <div className="grid grid-cols-1 gap-8 p-6">
      <div>
        <h1 className="mb-2 text-2xl font-extrabold text-gray-900">
          Traffic Light Example
        </h1>
        <p className="text-lg text-gray-700">
          Press 'next' to move to the next state in the traffic light.
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
