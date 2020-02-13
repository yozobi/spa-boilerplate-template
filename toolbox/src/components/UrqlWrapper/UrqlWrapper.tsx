import React, { useMemo } from 'react';
import {
  Client,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';
// import { suspenseExchange } from '@urql/exchange-suspense';
import Auth from '@aws-amplify/auth';

interface UrqlWrapperProps {
  endpoint: string;
  superAdminKey?: string;
}

export const UrqlWrapper: React.FC<UrqlWrapperProps> = ({
  children,
  endpoint,
  superAdminKey,
}) => {
  const client = useMemo(
    () =>
      new Client({
        url: endpoint,
        exchanges: [
          dedupExchange,
          // suspenseExchange,
          cacheExchange,
          fetchExchange,
        ],
        fetchOptions: superAdminKey
          ? // superAdminKey is truthy
            ({ headers: { 'x-hasura-admin-secret': superAdminKey } } as any)
          : // superAdminKey is falsy, use the idToken JWT from Cognito instead
            async () => {
              const result = (await Auth.currentSession()) as any;
              return {
                headers: {
                  Authorization: result?.idToken?.jwtToken
                    ? `Bearer ${result.idToken.jwtToken}`
                    : undefined,
                },
              };
            },
        // suspense: true, /** Disabled as it was causing issues with refetching */
      }),
    [endpoint, superAdminKey],
  );
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlWrapper;
