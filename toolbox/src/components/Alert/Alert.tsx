import React from 'react';
import { TwoVariantClassnameMap } from '../../types/ClassnameMap';
import classNames from 'classnames';

export interface AlertProps {
  variant?: 'light-with-left-border' | 'heavy';
  color?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'gray';
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
  gray: {
    'light-with-left-border':
      'bg-gray-200 text-gray-800 border-gray-600 border-l-4',
    heavy: 'bg-gray-800 text-gray-100',
  },
  primary: {
    'light-with-left-border':
      'bg-primary-200 text-primary-800 border-primary-600 border-l-4',
    heavy: 'bg-primary-800 text-primary-100',
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
  return (
    <div className={classes} role="alert">
      {children}
    </div>
  );
};

export default Alert;
