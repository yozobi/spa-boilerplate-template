import React from 'react';
import { useFormikContext } from 'formik';

export function CanGoToNextPage<T extends object>({
  children,
  required,
}: {
  required: (keyof T)[];
  children: (canGo: boolean) => React.ReactNode;
}) {
  const { errors, values } = useFormikContext<T>();

  let canGo = true;
  required.forEach((field) => {
    if (errors?.[field] || !values?.[field]) {
      canGo = false;
    }
  });
  return <>{children(canGo)}</>;
}

export default CanGoToNextPage;
