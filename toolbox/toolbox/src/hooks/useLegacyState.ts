import { useState } from 'react';

/**
 * "Legacy" being the pre-hooks days, when classes were popular.
 *
 * This gives you the old this.setState behaviour
 *
 * @deprecated - not very useful, use useReducer or XState instead
 */
export const useLegacyState = <S extends object>(
  initialState: S,
): [S, (state: Partial<S>) => void] => {
  const [state, setState] = useState<S>(initialState);

  const legacySetState = (newState: Partial<S>) => {
    setState({ ...state, ...newState });
  };
  return [state, legacySetState];
};
