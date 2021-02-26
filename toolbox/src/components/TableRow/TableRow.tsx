import React from 'react';
import classNames from 'classnames';

interface TableRowProps {
  color?: 'primary' | 'gray';
  padding?: 'small' | 'medium';
  isOdd?: boolean;
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  children,
  color = 'gray',
  padding = 'medium',
  isOdd,
  className,
}) => {
  const classes = classNames(
    {
      'bg-gray-100': color === 'gray' && !isOdd,
      'bg-gray-200': color === 'gray' && isOdd,
      'bg-primary-100': color === 'primary' && !isOdd,
      'bg-primary-200': color === 'primary' && isOdd,
      'text-gray-800': color === 'gray',
      'text-primary-800': color === 'primary',
      'px-8 p-6': padding === 'medium',
      'px-6 p-4': padding === 'small',
    },
    'w-full',
    className,
  );
  return <div className={classes}>{children}</div>;
};

export default TableRow;
