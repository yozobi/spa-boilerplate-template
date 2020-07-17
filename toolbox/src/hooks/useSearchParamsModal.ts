import { useSearchParamsState } from './useSearchParamsState';

export interface UseSearchParamsModalReturn<CachedState = undefined> {
  state: CachedState | null | undefined;
  open: boolean;
  onOpen: (state?: CachedState) => void;
  onClose: () => void;
  setState: (state: CachedState) => void;
  onToggle: () => void;
}

export const useSearchParamsModal = <CachedState = any>(
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
    setModalState(state || true);
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
