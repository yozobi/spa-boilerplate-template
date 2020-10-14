import React from 'react';
import { Flex } from './Flex';

export default { title: 'Flex' };

export const column = () => (
  <Flex flexDirection="column" className="bg-primary-200">
    <button>Hey!</button>
    <button>Hey!</button>
  </Flex>
);

export const row = () => (
  <Flex flexDirection="row" className="bg-primary-200">
    <button>Hey!</button>
    <button>Hey!</button>
  </Flex>
);

export const nested = () => (
  <Flex
    my={6}
    flexDirection="column"
    alignItems="center"
    className="bg-primary-200"
  >
    <button>Hey!</button>
    <Flex
      mx={4}
      justifyContent="space-between"
      className="w-full bg-primary-300"
    >
      <button>Hey!</button>
      <Flex flexDirection="column" my={6} className="bg-primary-400">
        <button>Hey!</button>
        <button>Hey!</button>
      </Flex>
      <button>Hey!</button>
      <button>Hey!</button>
    </Flex>
  </Flex>
);
