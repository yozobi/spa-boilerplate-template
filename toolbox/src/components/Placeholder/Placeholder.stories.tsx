import React from 'react';
import { Placeholder } from './Placeholder';
import Flex from '../Flex/Flex';

export default { title: 'Placeholder' };

export const withText = () => (
  <>
    <main className="w-full min-h-screen flex flex-col items-start">
      <Placeholder className="w-full h-16" title="NavBar"></Placeholder>
      <div className="flex-1 w-full flex">
        <Placeholder className="w-48" title="SideBar"></Placeholder>
        <section className="p-6">
          <Flex flexDirection="column" my={6}>
            <a
              href="https://twitter.com/markdalgleish/status/1218663867485523968"
              target="_blank"
              className="text-primary-700 underline"
            >
              Meme-lord Mark Dalgleish (inventor of Playroom) thinks you should
              have a placeholder component.
            </a>
            <Flex>
              <Placeholder className="h-16 w-16" title="Image"></Placeholder>
              <Placeholder className="h-16 w-16" title="Image"></Placeholder>
              <Placeholder className="h-16 w-16" title="Image"></Placeholder>
              <Placeholder className="h-16 w-16" title="Image"></Placeholder>
            </Flex>
          </Flex>
        </section>
      </div>
    </main>
  </>
);
