import { select, text, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { Alert } from './Alert';

export default { title: 'Alert', decorators: [withKnobs] };

export const Default = () => {
  const variant = select(
    'Variant',
    ['light-with-left-border', 'heavy'],
    'light-with-left-border',
  );
  const color = select(
    'Color',
    ['danger', 'warning', 'info', 'success'],
    'danger',
  );

  const children = text('Text', 'Something went wrong! Oh no!');
  return (
    <div className="p-6">
      <Alert color={color} variant={variant}>
        {children}
      </Alert>
    </div>
  );
};
