import React, { useState } from 'react';
import { Modal } from './Modal';
import Flex from '../Flex/Flex';
import HeroIconX from '../HeroIcons/HeroIconX';
import HeroIconExclamation from '../HeroIcons/HeroIconExclamation';
import ButtonBase from '../ButtonBase/ButtonBase';

export default { title: 'Modal' };

export const Normal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-6">
      <button
        className="px-2 py-1 mb-6 bg-gray-200"
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
        className="p-4 bg-white rounded-lg shadow"
      >
        <div>
          <div className="p-2">
            <div className="flex justify-start">
              <HeroIconExclamation className="w-8 h-8 mr-4 text-danger-600" />
              <div>
                <h1 className="mb-1 text-lg font-semibold tracking-tight text-gray-800">
                  Are you sure you want to do this?
                </h1>
                <p className="text-sm text-gray-700">
                  Deleting this author will mean deleting all of their posts.
                </p>
              </div>
            </div>
          </div>
          <Flex justifyContent="flex-end" className="mt-3" mx={2}>
            <ButtonBase className="rounded " size="small" color="gray">
              Cancel
            </ButtonBase>
            <ButtonBase
              size="small"
              color="danger"
              // background="heavy-fill"
              className="font-semibold rounded tracking-snug"
            >
              Delete
            </ButtonBase>
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
        className="p-4 bg-white"
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
        className="px-2 py-1 mb-6 bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="max-w-md px-6 py-6 pt-5 text-red-900 bg-red-200 border-l-8 border-red-600">
          <Flex my={4}>
            <div>
              <span className="block mb-2 font-semibold tracking-tight">
                Something Went Wrong!
              </span>
              <span className="block text-xs text-red-900">
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
