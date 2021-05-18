import React, {
  useEffect,
  useState,
  useRef,
  useContext,
  createContext,
} from 'react';
import * as serviceWorker from './serviceWorker';

interface ServiceWorkerContextType {
  canUpdate: boolean;
  forceUpdate: () => void;
}

const ServiceWorkerContext = createContext<ServiceWorkerContextType>({
  canUpdate: false,
  forceUpdate: () => {},
});

/**
 * The ServiceWorkerProvider handles the job of registering
 * and managing the service worker, and allows us allow users
 * to force update their browsers when there is new code.
 */
const ServiceWorkerProvider: React.FC<{ disableServiceWorker?: boolean }> = ({
  children,
  disableServiceWorker = false,
}) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const updateSwRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (disableServiceWorker) {
      serviceWorker.unregister();
    } else {
      serviceWorker.register({
        onUpdate: (sw) => {
          updateSwRef.current = () => {
            sw.postMessage({ type: 'SKIP_WAITING' });
            window.location.reload();
          };
          setCanUpdate(true);
        },
      });
    }
  }, [disableServiceWorker]);

  return (
    <ServiceWorkerContext.Provider
      value={{ canUpdate, forceUpdate: updateSwRef.current }}
    >
      {children}
    </ServiceWorkerContext.Provider>
  );
};

export default ServiceWorkerProvider;

/**
 * This is a simple hook that allows any component
 * further down the tree to hook in to the service worker
 */
export const useServiceWorker = () => useContext(ServiceWorkerContext);
