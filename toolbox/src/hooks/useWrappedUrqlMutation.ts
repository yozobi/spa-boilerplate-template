import { UseMutationResponse, OperationResult } from 'urql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export interface UseWrappedUrqlMutationOptions<T> {
  onSuccess?: (data?: T) => void;
  onError?: (result: OperationResult<T>) => void;
  notifyErrorTracker?: (message: string, description?: any) => void;
}

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
  }: UseWrappedUrqlMutationOptions<T> = {
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

/**
 * Make your own useWrappedDocumentNodeMutation, with a dynamic
 * version of urql
 */
export const makeUseWrappedDocumentNodeMutation = (
  useMutation: <T, V>(query: DocumentNode<T, V>) => any,
) => <T, V>(
  documentNode: DocumentNode<T, V>,
  options?: UseWrappedUrqlMutationOptions<T>,
) => {
  const useMutationWithNode = () => useMutation<T, V>(documentNode);

  // eslint-disable-next-line
  return useWrappedUrqlMutation<T, V>(useMutationWithNode, options);
};
