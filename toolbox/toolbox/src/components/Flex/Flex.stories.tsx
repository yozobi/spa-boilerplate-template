import React from 'react';
import { Flex } from './Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export default { title: 'Flex' };

export const column = () => (
  <Flex flexDirection="column" className="bg-primary-200">
    <ButtonBase>Hey!</ButtonBase>
    <ButtonBase>Hey!</ButtonBase>
  </Flex>
);

export const row = () => (
  <Flex flexDirection="row" className="bg-primary-200">
    <ButtonBase>Hey!</ButtonBase>
    <ButtonBase>Hey!</ButtonBase>
  </Flex>
);

export const nested = () => (
  <Flex
    my={6}
    flexDirection="column"
    alignItems="center"
    className="bg-primary-200"
  >
    <ButtonBase>Hey!</ButtonBase>
    <Flex
      mx={4}
      justifyContent="space-between"
      className="w-full bg-primary-300"
    >
      <ButtonBase>Hey!</ButtonBase>
      <Flex flexDirection="column" my={6} className="bg-primary-400">
        <ButtonBase>Hey!</ButtonBase>
        <ButtonBase>Hey!</ButtonBase>
      </Flex>
      <ButtonBase>Hey!</ButtonBase>
      <ButtonBase>Hey!</ButtonBase>
    </Flex>
  </Flex>
);
