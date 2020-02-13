import {
  ToastContainer as ImportedToastContainer,
  toast,
} from 'react-toastify';

export const ToastContainer = ImportedToastContainer;

export const useToast = () => {
  return toast;
};

export default ToastContainer;
