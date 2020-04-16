import React, { useMemo } from 'react';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { Client, defaultExchanges, Provider, subscriptionExchange } from 'urql';

interface UrqlWrapperProps {
  endpoint: string;
  websocketEndpoint: string;
  headers?: {};
}

export const UrqlWrapperWithSubscriptions: React.FC<UrqlWrapperProps> = ({
  children,
  endpoint,
  websocketEndpoint,
  headers,
}) => {
  const subscriptionClient = useMemo(() => {
    return new SubscriptionClient(websocketEndpoint, {
      reconnect: true,
      timeout: 20000,
      connectionParams: {
        headers,
      },
    });
  }, [websocketEndpoint]);

  const client = useMemo(
    () =>
      new Client({
        url: endpoint,
        exchanges: [
          ...defaultExchanges,
          subscriptionExchange({
            forwardSubscription: (operation) =>
              subscriptionClient.request(operation),
          }),
        ],
        fetchOptions: {
          headers,
        },
      }),
    [endpoint, JSON.stringify(headers)],
  );
  return <Provider value={client}>{children}</Provider>;
};

export default UrqlWrapperWithSubscriptions;
