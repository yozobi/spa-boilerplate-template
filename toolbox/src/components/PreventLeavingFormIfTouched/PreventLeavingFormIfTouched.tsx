import React from 'react';
import { Prompt } from 'react-router-dom';
import { useFormikContext } from 'formik';

interface PreventLeavingFormIfTouchedProps {
  message?: string;
}

/**
 * Prompts you with a react-router-dom prompt
 * if it detects that the formik context is dirty.
 */
export const PreventLeavingFormIfTouched: React.FC<PreventLeavingFormIfTouchedProps> = ({
  children,
  message,
}) => {
  const { dirty, isSubmitting } = useFormikContext();
  if (dirty && !isSubmitting) {
    return (
      <Prompt
        message={
          message ||
          'There are unsaved details on this page. Are you sure you want to leave?'
        }
      />
    );
  }
  return null;
};

export default PreventLeavingFormIfTouched;
