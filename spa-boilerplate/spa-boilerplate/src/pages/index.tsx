import React from 'react';
import { Flex, HeroIconThumbUp, AnimatedButtonBase } from 'toolbox';

const HomePage = () => {
  return (
    <Flex flexDirection="column" my={6}>
      <Flex alignItems="center">
        <div data-testid="hello-world">Hello World!</div>
        <button className="px-3 py-2 bg-primary-200 text-primary-700">
          <Flex alignItems="center">
            <HeroIconThumbUp className="mr-3" />
            An Imported Button!
          </Flex>
        </button>
        <AnimatedButtonBase color="success">Hover over me!</AnimatedButtonBase>
      </Flex>
    </Flex>
  );
};

export default HomePage;
