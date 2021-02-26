import React from 'react';
import { TableRow } from './TableRow';
import { withKnobs, select } from '@storybook/addon-knobs';

export default { title: 'TableRow', decorators: [withKnobs] };

export const Default = () => {
  const padding = select('Padding', ['small', 'medium'], 'small');
  const color = select('Color', ['primary', 'gray'], 'gray');
  return (
    <>
      <TableRow padding={padding} color={color}>
        Hello TableRow!
      </TableRow>
      <TableRow padding={padding} color={color} isOdd>
        Hello TableRow!
      </TableRow>
      <TableRow padding={padding} color={color}>
        Hello TableRow!
      </TableRow>
      <TableRow padding={padding} color={color} isOdd>
        Hello TableRow!
      </TableRow>
    </>
  );
};
