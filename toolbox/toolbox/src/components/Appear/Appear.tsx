import React, { Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AppearProps {
  visible: boolean;
}

export const Appear: React.FC<AppearProps> = ({ children, visible }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ x: 0, opacity: 1 }}
          initial={{ x: -40, opacity: 0 }}
          exit={{ x: -40, opacity: 0 }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Appear;
