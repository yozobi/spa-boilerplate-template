import React from 'react';
import { ButtonBase } from './ButtonBase';
import { withKnobs, select } from '@storybook/addon-knobs';

export default { title: 'ButtonBase', decorators: [withKnobs] };

export const Default = () => {
  const size = select('Size', ['small', 'medium'], 'small');
  const color = select(
    'Color',
    ['primary', 'gray', 'danger', 'warning', 'info', 'success'],
    'primary',
  );
  const background = select(
    'Background Style',
    ['light-fill', 'heavy-fill', 'no-fill-with-border'],
    'light-fill',
  );
  return (
    <div className="p-6">
      <ButtonBase size={size} color={color} background={background}>
        Hello ButtonBase
      </ButtonBase>
    </div>
  );
};
