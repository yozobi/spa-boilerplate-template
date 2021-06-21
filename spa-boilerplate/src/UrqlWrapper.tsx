import React, { useMemo } from 'react';
import {
  cacheExchange,
  Client,
  dedupExchange,
  fetchExchange,
  Provider,
} from 'urql';

interface UrqlWrapperProps {}

export const UrqlWrapper: React.FC<UrqlWrapperProps> = ({ children }) => {
  const client = useMemo(
    () =>
      new Client({
        url: process.env.REACT_APP_HASURA_ENDPOINT,
        exchanges: [
          dedupExchange,
          // suspenseExchange,
          cacheExchange,
          fetchExchange,
        ],
        fetchOptions: {
          headers: {
            ...(process.env.REACT_APP_HASURA_SECRET && {
              'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
            }),
          },
        },
      }),
    [],
  );
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlWrapper;
