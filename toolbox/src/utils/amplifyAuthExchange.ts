import { pipe, share, filter, map, mergeMap, fromPromise, merge } from 'wonka';
import { Exchange, Operation } from 'urql';
import Auth from '@aws-amplify/auth';

const addTokenToOperation = (operation: Operation, token: string) => {
  const fetchOptions =
    typeof operation.context.fetchOptions === 'function'
      ? operation.context.fetchOptions()
      : operation.context.fetchOptions || {};

  if (!token) {
    return operation;
  }

  return {
    ...operation,
    context: {
      ...operation.context,
      fetchOptions: {
        ...fetchOptions,
        headers: {
          ...fetchOptions.headers,
          Authorization: `Bearer ${token}`,
        },
      },
    },
  };
};

let getTokenPromise: Promise<string> | null = null;

const getAmplifyToken = async () => {
  try {
    return (await (await Auth.currentSession()).getIdToken()).getJwtToken();
  } catch (e) {
    console.log(e);
    return '';
  }
};

/**
 * Deduplicate calls to prevent overfetching
 */
const deduplicateGetToken = async () => {
  if (getTokenPromise) return getTokenPromise;

  const promise = getAmplifyToken();
  getTokenPromise = promise;
  const jwt = await promise;
  getTokenPromise = null;
  return jwt;
};

/**
  This exchange performs authentication and is a recipe.
  The `getToken` function gets a token, e.g. from local storage.
  The `isTokenExpired` function checks whether we need to refresh.
  The `refreshToken` function calls fetch to get a new token and stores it in local storage.
  */
export const amplifyAuthExchange: () => Exchange = () => ({ forward }) => {
  return (ops$) => {
    // We share the operations stream
    const sharedOps$ = pipe(ops$, share);

    const withToken$ = pipe(
      sharedOps$,
      // Filter by non-teardowns
      filter((operation) => operation.operationName !== 'teardown'),
      mergeMap((operation) => {
        // check whether the token is expired
        // const isExpired = refreshToken || isTokenExpired();

        // // If it's not expired then just add it to the operation immediately
        // if (!isExpired) {
        //   return fromValue(
        //     addTokenToOperation(operation, Auth.currentSession()),
        //   );
        // }

        // // If it's expired and we aren't refreshing it yet, start refreshing it
        // if (isExpired && !jwtPromise) {
        //   refreshToken = refreshToken(); // we share the promise
        // }

        return pipe(
          fromPromise(deduplicateGetToken()),
          map<string, ReturnType<typeof addTokenToOperation>>((token) => {
            return addTokenToOperation(operation, token);
          }),
        );
      }),
    );

    // We don't need to do anything for teardown operations
    const withoutToken$ = pipe(
      sharedOps$,
      filter((operation) => operation.operationName === 'teardown'),
    );

    return pipe(merge([withToken$, withoutToken$]), forward);
  };
};
