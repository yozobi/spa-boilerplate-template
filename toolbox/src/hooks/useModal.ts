import { useState } from 'react';

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOpen = () => {
    setOpen(true);
  };

  return {
    open,
    onOpen,
    onClose,
  };
};
