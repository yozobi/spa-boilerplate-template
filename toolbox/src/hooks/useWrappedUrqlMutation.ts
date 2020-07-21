import { UseMutationResponse, OperationResult } from 'urql';
import Bugsnag from '@bugsnag/js';

/**
 * Use this hook to wrap a mutation to add
 * various event listeners, and customise the return
 * to your liking.
 */
export const useWrappedUrqlMutation = <T, V>(
  useMutation: () => UseMutationResponse<T, V>,
  {
    onSuccess,
    onError,
    notifyErrorTracker,
  }: {
    onSuccess?: (data?: T) => void;
    onError?: (result: OperationResult<T>) => void;
    notifyErrorTracker?: (message: string, description?: any) => void;
  } = {
    notifyErrorTracker: console.error,
  },
) => {
  /** We take the mutation you pass in */
  const [{ error, data, fetching, stale }, dispatchMutation] = useMutation();

  /**
   * A custom dispatch function wrapped in some event handlers
   */
  const dispatch: typeof dispatchMutation = async (...args) => {
    const result = await dispatchMutation(...args);
    if (result.error?.message) {
      Bugsnag.notify(result.error);
      onError?.(result);
      notifyErrorTracker?.(result.error?.message, result);
    } else {
      onSuccess?.(result.data);
    }
    return result;
  };

  /**
   * We return all the elements in the useMutation
   * hook you passed in, with the wrapped dispatch function
   */
  return {
    dispatch,
    error,
    data,
    fetching,
    stale,
    errorMessage: error?.message,
  };
};
