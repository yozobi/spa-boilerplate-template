import { useState } from 'react';

export const useModal = <CachedState = undefined>() => {
  const [open, setOpen] = useState(false);
  const [cachedState, setCachedState] = useState<CachedState | null>();

  const onClose = () => {
    if (cachedState) {
      setCachedState(null);
    }
    setOpen(false);
  };

  const onOpen = (state?: CachedState) => {
    if (state) {
      setCachedState(state);
    }
    setOpen(true);
  };

  return {
    state: cachedState,
    open,
    onOpen,
    onClose,
  };
};
