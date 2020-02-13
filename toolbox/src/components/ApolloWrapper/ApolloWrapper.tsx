import React, { useMemo } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

interface ApolloWrapperProps {
  endpoint: string;
  superAdminKey?: string;
}

export const ApolloWrapper: React.FC<ApolloWrapperProps> = ({
  children,
  endpoint,
  superAdminKey,
}) => {
  const client = useMemo(
    () =>
      new ApolloClient({
        uri: endpoint,
        headers: {
          ...(superAdminKey && {
            'x-hasura-admin-secret': superAdminKey,
          }),
        },
      }),
    [endpoint, superAdminKey],
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
