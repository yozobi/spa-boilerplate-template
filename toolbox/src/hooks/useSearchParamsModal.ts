import { useSearchParamsState } from './useSearchParamsState';

export interface UseSearchParamsModalReturn<CachedState = null> {
  state: CachedState | null | undefined;
  open: boolean;
  onOpen: (state?: CachedState) => void;
  onClose: () => void;
  setState: (state: CachedState) => void;
  onToggle: () => void;
}

/**
 * Allows for storing the open and closed state of a modal
 * in search params, to ensure the back button works effectively
 */
export const useSearchParamsModal = <CachedState = null>(
  modalId: string,
): UseSearchParamsModalReturn<CachedState> => {
  const [modalState, setModalState] = useSearchParamsState<
    CachedState | boolean
  >(modalId, {
    method: 'push',
  });

  const onClose = () => {
    setModalState(undefined);
  };

  const onOpen = (state?: CachedState) => {
    if (state) {
      try {
        // This try/catch helps catch when you accidentally pass in
        // circular objects, which cannot be stringified into a search param
        JSON.stringify(state);
        setModalState(state);
      } catch (e) {
        setModalState(true);
      }
    } else {
      setModalState(true);
    }
  };

  const setState = (state: CachedState) => {
    setModalState(state);
  };

  const open = Boolean(modalState);

  return {
    state: typeof modalState === 'boolean' ? undefined : modalState,
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
