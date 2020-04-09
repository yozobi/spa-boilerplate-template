import { ReactNode } from 'react';

/**
 * This is a handy utility for adding separators
 * to components, for instance to separate
 * breadcrumb links with an arrow
 */
export const addComponentSeparator = (
  components: ReactNode[],
  separator: ReactNode,
) => {
  return components.reduce(
    (array: ReactNode[], component, index, allComponents) => {
      if (index === allComponents.length - 1) {
        return [...array, component];
      }
      return [...array, component, separator];
    },
    [] as ReactNode[],
  );
};
