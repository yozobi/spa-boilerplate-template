import { useEffect, MutableRefObject } from 'react';

/**
 * Detect clicks outside an element
 */
export const useOnClickOutside = ({
  ref,
  handler,
  disabled = false,
}: {
  ref: MutableRefObject<HTMLElement | null | undefined>;
  handler: (event: MouseEvent | TouchEvent) => void;
  disabled?: boolean;
}) => {
  useEffect(
    () => {
      if (!disabled) {
        const listener = (event: MouseEvent | TouchEvent) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref?.current.contains(event.target as any)) {
            return;
          }

          handler(event);
        };

        document.addEventListener('click', listener);

        return () => {
          document.removeEventListener('click', listener);
        };
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler, disabled],
  );
};
