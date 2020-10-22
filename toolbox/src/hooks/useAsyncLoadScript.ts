import { useEffect } from 'react';

interface UseAsyncLoadScriptParams {
  src: string;
  onLoad: () => void;
}

/**
 * Used to asynchronously load an external script file
 * via a CDN. Useful for loading in Paddle, Matterport etc.
 */
export const useAsyncLoadScript = ({
  src,
  onLoad,
}: UseAsyncLoadScriptParams) => {
  useEffect(() => {
    const scriptElement = document.createElement('script');
    scriptElement.src = src;
    scriptElement.onload = onLoad;

    // TODO - double check that this works with IE11
    document.body.appendChild(scriptElement);
  }, [src]);
};
