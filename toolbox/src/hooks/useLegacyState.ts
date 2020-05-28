import { useState } from 'react';

export const useLegacyState = <S extends object>(
  initialState: S,
): [S, (state: Partial<S>) => void] => {
  const [state, setState] = useState<S>(initialState);

  const legacySetState = (newState: Partial<S>) => {
    setState({ ...state, ...newState });
  };
  return [state, legacySetState];
};
