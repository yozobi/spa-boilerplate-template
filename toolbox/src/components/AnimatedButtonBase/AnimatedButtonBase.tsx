import React, { ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface Props {
  color?:
    | 'primary'
    | 'gray'
    | 'info'
    | 'success'
    | 'warning'
    | 'danger'
    | 'smoke';
}

const colorClasses: { [K in Required<Props>['color']]: string } = {
  gray: 'bg-gray-100 text-gray-700',
  primary: 'bg-primary-100 text-primary-700',
  info: 'bg-info-100 text-info-700',
  warning: 'bg-warning-100 text-warning-800',
  success: 'bg-success-100 text-success-800',
  danger: 'bg-danger-100 text-danger-700',
  smoke: 'bg-smoke-100 text-gray-900',
};

export const AnimatedButtonBase: React.FC<HTMLMotionProps<'button'> &
  Props> = forwardRef((props, ref: Ref<HTMLButtonElement>) => {
  const {
    children,
    type = 'button',
    color = 'primary',
    className = '',
  } = props;

  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.1 }}
      className={`${colorClasses[color]} font-sans font-semibold rounded px-4 py-2 text-xs tracking-widest shadow-sm active:shadow-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});

export default AnimatedButtonBase;
