import React from 'react';
import { TwoVariantClassnameMap } from '../../types/ClassnameMap';
import classNames from 'classnames';

interface AlertProps {
  variant?: 'light-with-left-border' | 'heavy';
  color?: 'info' | 'success' | 'warning' | 'danger';
  className?: string;
}

const classnameMaps: TwoVariantClassnameMap<
  Required<AlertProps>['color'],
  Required<AlertProps>['variant']
> = {
  info: {
    'light-with-left-border':
      'bg-info-200 text-info-800 border-info-600 border-l-4',
    heavy: 'bg-info-800 text-info-100',
  },
  success: {
    'light-with-left-border':
      'bg-success-200 text-success-800 border-success-600 border-l-4',
    heavy: 'bg-success-800 text-success-100',
  },
  warning: {
    'light-with-left-border':
      'bg-warning-200 text-warning-800 border-warning-600 border-l-4',
    heavy: 'bg-warning-800 text-warning-100',
  },
  danger: {
    'light-with-left-border':
      'bg-danger-200 text-danger-800 border-danger-600 border-l-4',
    heavy: 'bg-danger-800 text-danger-100',
  },
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'light-with-left-border',
  color = 'danger',
  className,
}) => {
  const classes = classNames(
    'p-6',
    'inline-block',
    classnameMaps[color][variant],
    className,
  );
  return <div className={classes}>{children}</div>;
};

export default Alert;
