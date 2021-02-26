import React from 'react';
import Flex, { FlexProps } from '../Flex/Flex';

/**
 * The same thing as a Flex component, but defaults
 * to flexDirection=column and alignItems=stretch
 */
export const Stack: React.FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex alignItems="stretch" flexDirection="column" my={4} {...props}>
      {children}
    </Flex>
  );
};

export default Stack;
