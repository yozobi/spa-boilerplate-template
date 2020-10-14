import React, { useState } from 'react';
import { Modal } from './Modal';
import Flex from '../Flex/Flex';
import HeroIconX from '../HeroIcons/HeroIconX';
import HeroIconExclamation from '../HeroIcons/HeroIconExclamation';

export default { title: 'Modal' };

export const Normal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6">
      <button
        className="px-2 py-1 bg-gray-200 mb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <h1 className="text-xs italic" style={{ maxWidth: '60ch' }}>
        This modal is stylable via tailwind CSS, and is also accessible. The
        backdrop autofocuses so that users with screen readers can close it
        easily.
      </h1>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-white p-4 shadow rounded-lg"
      >
        <div>
          <div className="p-2">
            <div className="flex justify-start">
              <HeroIconExclamation className="text-danger-600 w-8 h-8 mr-4" />
              <div>
                <h1 className="font-semibold text-lg tracking-tight text-gray-800 mb-1">
                  Are you sure you want to do this?
                </h1>
                <p className="text-sm text-gray-700">
                  Deleting this author will mean deleting all of their posts.
                </p>
              </div>
            </div>
          </div>
          <Flex justifyContent="flex-end" className="mt-3" mx={2}>
            <button className="rounded " color="gray">
              Cancel
            </button>
            <button
              color="danger"
              // background="heavy-fill"
              className="rounded font-semibold tracking-snug"
            >
              Delete
            </button>
          </Flex>
        </div>
      </Modal>
    </div>
  );
};

export const WithLongScrollBackground = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6" style={{ height: 2000 }}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Open'}
      </button>
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="bg-white p-4"
      >
        <span>Hello!</span>
      </Modal>
    </div>
  );
};

export const Danger = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6">
      <button
        className="px-2 py-1 bg-gray-200 mb-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="max-w-md border-l-8 border-red-600 bg-red-200 px-6 py-6 pt-5 text-red-900">
          <Flex my={4}>
            <div>
              <span className="block tracking-tight font-semibold mb-2">
                Something Went Wrong!
              </span>
              <span className="text-xs block text-red-900">
                Oh dear, what a shame. We'll just have to try again next time.
              </span>
            </div>
            <div>
              <button onClick={() => setIsOpen(false)} title="Go Back">
                <HeroIconX />
              </button>
            </div>
          </Flex>
        </div>
      </Modal>
    </div>
  );
};
