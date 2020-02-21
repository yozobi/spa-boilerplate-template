import React from 'react';
import { ToastContainer, useToast } from './ToastContainer';

export default {
  title: 'ToastContainer',
};

export const Default = () => (
  <div className="p-6">
    <ToastTestPage></ToastTestPage>
    <ToastContainer draggable={false} hideProgressBar></ToastContainer>
  </div>
);

const ToastTestPage = () => {
  /**
   * It's a good idea to pull toast from useToast - that way,
   * we can move to a different library in the future without
   * having to pull all the imports in.
   */
  const toast = useToast();

  return (
    <button
      onClick={() =>
        /**
         * I'd suggest making a custom useToast hook per
         * library, and abstract all of this logic behind it.
         */
        toast.success('Sent successfully')
      }
    >
      Send a Toast!
    </button>
  );
};
