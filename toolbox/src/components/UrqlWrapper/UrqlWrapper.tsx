import React, { useMemo } from 'react';
import {
  Client,
  Provider,
  dedupExchange,
  cacheExchange,
  fetchExchange,
} from 'urql';

export interface UrqlWrapperProps {
  endpoint: string;
  headers?: {};
}

export const UrqlWrapper: React.FC<UrqlWrapperProps> = ({
  children,
  endpoint,
  headers,
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
        fetchOptions: {
          headers,
        },
        // suspense: true, /** Disabled as it was causing issues with refetching */
      }),
    [endpoint, JSON.stringify(headers)],
  );
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlWrapper;
