import React from 'react';
import Flex from '../components/Flex/Flex';
import { addComponentSeparator } from './addComponentSeparator';
import HeroIconCheveronRight from '../components/HeroIcons/HeroIconCheveronRight';

export default { title: 'Add Component Separator' };

export const Breadcrumbs = () => {
  return (
    <div className="p-6">
      <p className="text-gray-600 max-w-sm mb-6 text-sm">
        This is a handy utility for adding separators to components, for
        instance to separate breadcrumb links with an arrow
      </p>
      <BreadcrumbsExample />
    </div>
  );
};

const BreadcrumbsExample: React.FC = () => {
  return (
    <Flex mx={1}>
      {addComponentSeparator(
        [
          <a href="#" className="text-base font-semibold text-gray-700">
            Balances
          </a>,
          <p
            className="text-base font-semibold text-gray-500"
            aria-disabled="true"
          >
            Fund Balance
          </p>,
        ],
        <HeroIconCheveronRight />,
      )}
    </Flex>
  );
};
