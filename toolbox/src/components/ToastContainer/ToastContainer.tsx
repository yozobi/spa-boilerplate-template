import {
  ToastContainer as ImportedToastContainer,
  toast,
} from 'react-toastify';

export const ToastContainer = ImportedToastContainer;

export const useToast = () => {
  const info = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-info-200 text-info-900 border-l-4 border-info-500 flex items-center',
      progressClassName: 'bg-info-900',
    });
  };
  const danger = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-danger-200 text-danger-900 border-l-4 border-danger-500 flex items-center',
      progressClassName: 'bg-danger-900',
    });
  };
  const success = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-success-200 text-success-900 border-l-4 border-success-500 flex items-center',
      progressClassName: 'bg-success-900',
    });
  };
  const gray = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-gray-200 text-gray-900 border-l-4 border-gray-500 flex items-center',
      progressClassName: 'bg-gray-900',
    });
  };
  const primary = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-primary-200 text-primary-900 border-l-4 border-primary-500 flex items-center',
      progressClassName: 'bg-primary-900',
    });
  };
  const warning = (message: string) => {
    toast(message, {
      className:
        'p-4 px-6 bg-warning-200 text-warning-900 border-l-4 border-warning-500 flex items-center',
      progressClassName: 'bg-warning-900',
    });
  };
  return {
    info,
    danger,
    success,
    gray,
    primary,
    warning,
  };
};

export default ToastContainer;
