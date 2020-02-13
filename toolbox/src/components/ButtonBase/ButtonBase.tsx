import React, { ButtonHTMLAttributes } from 'react';

interface Props {
  color?: 'primary' | 'gray';
}

const colorClasses: { [K in Required<Props>['color']]: string } = {
  gray: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-700',
};

export const ButtonBase: React.FC<ButtonHTMLAttributes<HTMLButtonElement> &
  Props> = ({ children, color = 'primary', className = '', ...props }) => {
  return (
    <button
      className={`${colorClasses[color]} font-sans px-4 py-2 text-xs uppercase tracking-widest ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonBase;
