import { useHistory, useLocation } from 'react-router-dom';
import { useSearchParams } from './useSearchParams';

/**
 * Offers a useState style interface, but the state
 * is stored on your search params. Very handy
 * for states that you'd like controlled via the back
 * button, like modals.
 */
export const useSearchParamsState = <T>(
  paramName: string,
  options?: {
    initialValue?: T;
    method?: 'push' | 'replace';
  },
): [T, (newState?: T) => void] => {
  const params = useSearchParams<any>();
  const history = useHistory();
  const location = useLocation();

  const setState = (newState: T | undefined) => {
    const newParams = {
      ...params,
      [paramName]: JSON.stringify(newState),
    };

    if (!newState) {
      delete newParams[paramName];
    }
    const newPath = `${location.pathname}?${new URLSearchParams(newParams)}`;

    if (options?.method === 'push') {
      history.push(newPath);
    } else {
      history.replace(newPath);
    }
  };

  let state = params?.[paramName];

  try {
    state = JSON.parse(state);
  } catch (e) {}

  return [state || options?.initialValue, setState];
};
