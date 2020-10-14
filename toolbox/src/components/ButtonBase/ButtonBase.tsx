import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { TwoVariantClassnameMap } from '../../types/ClassnameMap';

interface Props {
  color: 'primary' | 'gray' | 'info' | 'warning' | 'success' | 'danger';
  background: 'light-fill' | 'heavy-fill' | 'no-fill-with-border';
  size: 'small' | 'medium';
}

const classNameMap: TwoVariantClassnameMap<
  Props['background'],
  Props['color']
> = {
  'light-fill': {
    gray: 'bg-gray-100 focus:bg-gray-200 text-gray-700',
    info: 'bg-info-100 focus:bg-info-200 text-info-700',
    warning: 'bg-warning-100 focus:bg-warning-200 text-warning-800',
    success: 'bg-success-100 focus:bg-success-200 text-success-700',
    danger: 'bg-danger-100 focus:bg-danger-200 text-danger-700',
    primary: 'bg-primary-100 focus:bg-primary-200 text-primary-700',
  },
  'heavy-fill': {
    gray: 'bg-gray-700 focus:bg-gray-800 text-gray-100',
    info: 'bg-info-700 focus:bg-info-800 text-info-100',
    warning: 'bg-warning-700 focus:bg-warning-800 text-warning-100',
    success: 'bg-success-700 focus:bg-success-800 text-success-100',
    danger: 'bg-danger-700 focus:bg-danger-800 text-danger-100',
    primary: 'bg-primary-700 focus:bg-primary-800 text-primary-100',
  },
  'no-fill-with-border': {
    gray: 'focus:bg-gray-100 border border-gray-400 text-gray-700',
    info: 'focus:bg-info-100 border border-info-400 text-info-700',
    warning: 'focus:bg-warning-100 border border-warning-400 text-warning-700',
    success: 'focus:bg-success-100 border border-success-400 text-success-700',
    danger: 'focus:bg-danger-100 border border-danger-400 text-danger-700',
    primary: 'focus:bg-primary-100 border border-primary-400 text-primary-700',
  },
};

export const ButtonBase: React.FC<ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<Props>> = ({
  children,
  color = 'primary',
  background = 'light-fill',
  className = '',
  size = 'medium',
  ...props
}) => {
  const classes = classNames(
    'focus:outline-none',
    classNameMap[background][color],
    {
      'px-4 py-2 text-xs': size === 'medium',
      'px-3 py-1 text-xs': size === 'small',
    },
    className,
  );

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default ButtonBase;
