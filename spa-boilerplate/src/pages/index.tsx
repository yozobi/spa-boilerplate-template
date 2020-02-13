import React from 'react';
import { Flex, HeroIconThumbUp, AnimatedButtonBase } from 'toolbox';

const HomePage = () => {
  return (
    <Flex flexDirection="column" my={6}>
      <Flex alignItems="center">
        <div data-testid="hello-world">Hello World!</div>
        <button className="bg-primary-200 text-primary-700 py-2 px-3">
          <Flex alignItems="center">
            <HeroIconThumbUp className="mr-3"></HeroIconThumbUp>
            An Imported Button!
          </Flex>
        </button>
        <AnimatedButtonBase color="success">Hover over me!</AnimatedButtonBase>
      </Flex>
    </Flex>
  );
};

export default HomePage;
