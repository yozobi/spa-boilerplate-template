import {
  FieldInputProps,
  FormikConfig,
  FormikProvider,
  useFormik,
  FormikProps,
} from 'formik';
import React, { useMemo } from 'react';

export function useMutationForm<T>(
  params: FormikConfig<T> & {
    /**
     * Normally, we wait until the user has tried to submit
     * to show the errors. But, if you want, you can show them
     * immediately after the user blurs the input by passing
     * this as true
     */
    showErrorsOnTouched?: boolean;
  },
) {
  const formProps = useFormik<T>(params);

  const makeInputProps = <K extends keyof T>(
    name: K,
  ): FieldInputProps<T[K]> & { error: string; touched: boolean } => {
    const error = formProps.errors[name] as string;
    const touched = Boolean(formProps.touched[name]);
    const shouldShowError = Boolean(
      formProps.submitCount > 0 || (touched && params.showErrorsOnTouched),
    );
    const value = formProps.values[name];
    return {
      error: shouldShowError ? error : '',
      touched,
      value,
      onChange: formProps.handleChange,
      onBlur: formProps.handleBlur,
      name: name as string,
      checked: Boolean(value),
    };
  };

  const Provider = useMemo(
    () =>
      function MutationFormProvider({
        children,
        ...formProps
      }: FormikProps<T> & { children?: any }) {
        return (
          <FormikProvider value={formProps}>
            <form onSubmit={formProps.handleSubmit}>{children}</form>
          </FormikProvider>
        );
      },
    [],
  );

  return { ...formProps, makeInputProps, Provider };
}
