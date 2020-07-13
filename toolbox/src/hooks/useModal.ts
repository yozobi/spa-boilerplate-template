import { useState } from 'react';

export interface UseModalReturn<CachedState = undefined> {
  state: CachedState | null | undefined;
  open: boolean;
  onOpen: (state?: CachedState) => void;
  onClose: () => void;
  setState: (state: CachedState) => void;
  onToggle: () => void;
}

export const useModal = <CachedState = any>(): UseModalReturn<CachedState> => {
  const [open, setOpen] = useState(false);
  const [cachedState, setCachedState] = useState<CachedState | null>();

  const onClose = () => {
    setTimeout(() => {
      if (cachedState) {
        setCachedState(null);
      }
    }, [500]);
    setOpen(false);
  };

  const onOpen = (state?: CachedState) => {
    if (state) {
      setCachedState(state);
    }
    setOpen(true);
  };

  const setState = (state: CachedState) => {
    if (open) {
      setCachedState(state);
    }
  };

  return {
    state: cachedState,
    open,
    onOpen,
    onClose,
    setState,
    onToggle: () => {
      if (open) {
        onClose();
      } else {
        onOpen();
      }
    },
  };
};
