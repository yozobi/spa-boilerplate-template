import { UsersDocument } from 'graphql/queries/Users.generated';
import React from 'react';
import { Flex, HeroIconThumbUp, AnimatedButtonBase } from 'toolbox';
import { useQuery } from 'urql';

const HomePage = () => {
  const [result] = useQuery({
    query: UsersDocument,
  });
  return (
    <Flex flexDirection="column" my={6}>
      <Flex alignItems="center">
        {result.data?.Users.map((user) => (
          <div>{user.name}</div>
        ))}
      </Flex>
    </Flex>
  );
};

export default HomePage;
