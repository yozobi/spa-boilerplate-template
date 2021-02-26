import { useRef, useState } from 'react';

interface ConfirmParams {
  onConfirm?: () => void;
  onReject?: () => void;
}

/**
 * Use this hook to pause execution of a function
 * until the user has confirmed they want it to happen
 */
export const useConfirm = () => {
  const funcRef = useRef<(() => void) | null>();
  const onConfirmRef = useRef<(() => void) | null>();
  const onRejectRef = useRef<(() => void) | null>();

  const [isConfirming, setIsConfirming] = useState(false);

  const confirm = (
    func: () => void,
    { onConfirm, onReject }: ConfirmParams = {},
  ) => {
    funcRef.current = func;
    onConfirmRef.current = onConfirm;
    onRejectRef.current = onReject;
    setIsConfirming(true);
  };

  const onReject = () => {
    setIsConfirming(false);
    if (onRejectRef.current) {
      onRejectRef.current();
    }
    funcRef.current = null;
    onConfirmRef.current = null;
    onRejectRef.current = null;
  };

  const onConfirm = () => {
    setIsConfirming(false);
    if (onConfirmRef.current) {
      onConfirmRef.current();
    }
    if (funcRef.current) {
      funcRef.current();
    }
    funcRef.current = null;
    onConfirmRef.current = null;
    onRejectRef.current = null;
  };

  return {
    /**
     * Wrap a function in 'confirm' to delay
     * execution until the user has confirmed it.
     *
     * Usage:
     *
     * confirm(() => doSomething())
     */
    confirm,
    /**
     * Should we show the confirmation message?
     */
    isConfirming,
    /**
     * What to do when the user presses 'confirm'
     */
    onConfirm,
    /**
     * What to do when the user presses 'reject'
     */
    onReject,
  };
};
