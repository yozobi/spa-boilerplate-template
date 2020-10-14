import React from 'react';
import { motion } from 'framer-motion';

export interface AnimateInHeightProps {
  /**
   * If you'd like to have it animate from opacity: 0
   * to opacity: 1
   */
  animateOpacity?: boolean;
}

export const AnimateInHeight: React.FC<AnimateInHeightProps> = ({
  children,
  animateOpacity,
}) => {
  return (
    <motion.div
      animate={{
        height: 'auto',
        ...(animateOpacity && {
          opacity: 1,
        }),
      }}
      initial={{
        height: 0,
        ...(animateOpacity && {
          opacity: 0,
        }),
      }}
      exit={{
        height: 0,
        ...(animateOpacity && {
          opacity: 0,
        }),
      }}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateInHeight;
