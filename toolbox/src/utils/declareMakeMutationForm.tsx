import {
  FieldInputProps,
  FormikProvider,
  useField,
  useFormik,
  useFormikContext,
} from 'formik';
import React from 'react';

interface DeclareMakeMutationFormParams<T extends {}> {
  inputs: T;
}

/**
 * declareMakeMutationForm creates a function which you can
 * call in your project to help bootstrap forms. You pass in
 * a hash of inputs, which declare which form inputs
 * are available on this project.
 *
 * const makeMutationForm = declareMakeMutationForm({
 *   inputs: {
 *     text: (props) => <TextInput {...props} />,
 *     password: (props) => <TextInput {...props} type="password" />,
 *   },
 * })
 */
export function declareMakeMutationForm<
  Inputs extends { [K in keyof Inputs]: FormInputFC }
>({ inputs }: DeclareMakeMutationFormParams<Inputs>) {
  interface MakeMutationFormParams<V extends {}, T extends {}> {
    config: MutationFormConfig<V, T>;
    validate?: (values: V) => { [K in keyof V]?: string } | void;
  }
  /**
   * You can pass in a generic to makeMutationForm
   * to strongly type your form. For instance:
   *
   * type LoginFormVariables = {
   *   email: string;
   *   password: string;
   * }
   *
   * const LoginForm = makeMutationForm<LoginFormVariables>({ ... })
   *
   */
  return function makeMutationForm<MutationVariables extends {}>({
    config,
    validate: validateFromMakeMutationForm,
  }: MakeMutationFormParams<MutationVariables, Inputs>) {
    /**
     * Here, we declare a Wrapper which we'll use to
     * wrap the form, and pass in onSubmit, initialValues and validate.
     */
    const Wrapper: React.FC<MutationFormWrapperProps<MutationVariables>> = ({
      children,
      initialValues,
      onSubmit,
      validate: validateFromLocal,
    }) => {
      const formik = useFormik<MutationVariables>({
        initialValues: initialValues as any,
        onSubmit: (values: MutationVariables) => {
          onSubmit(values);
        },
        validate: validateFromLocal || validateFromMakeMutationForm,
      });
      return (
        /**
         * We wrap the form in a FormikProvider,
         * which means Formik can handle the form logic
         * and storing the state of the component.
         */
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>{children}</form>
        </FormikProvider>
      );
    };

    type InputsType = {
      [K in keyof Required<MutationVariables>]: Inputs[MutationFormConfig<
        Required<MutationVariables>,
        Inputs
      >[K]['type']];
    };

    /**
     * Here, we transform the config you passed into
     * an object, where each key is a react component. With a login form,
     * passing email and password:
     *
     * <LoginForm.Inputs.email label="Email" />
     * <LoginForm.Inputs.password label="Password" />
     *
     * This is typed to the generic that you passed in to
     * makeMutationForm
     */
    const Inputs: InputsType = Object.keys(config).reduce((obj, key) => {
      return {
        ...obj,
        [key]: (props: any) => {
          /** Pull out the type from the config we passed */
          const { type, ...configProps } = (config as any)[key];

          const Comp = inputs[type as keyof Inputs];
          /** Since we're using  */
          const [inputProps, metaProps] = useField(key);
          /**
           * We only show the error if the user has pressed
           * submit, or if the form input has been touched.
           */
          const { submitCount } = useFormikContext();
          const shouldShowError = submitCount > 0 || metaProps.touched;
          return (
            <Comp
              {...inputProps}
              {...configProps}
              {...metaProps}
              {...props}
              error={shouldShowError ? metaProps.error : undefined}
            />
          );
        },
      };
    }, {} as any);

    return {
      Wrapper,
      Inputs,
    };
  };
}

interface MutationFormWrapperProps<V> {
  initialValues: Partial<V>;
  onSubmit: (values: V) => void;
  validate?: (values: V) => { [K in keyof V]?: string } | void;
}

export type MutationFormConfig<V, T> = {
  [K in keyof V]: {
    type: keyof T;
    label?: string;
    className?: string;
  };
};

type FormInputFC = React.FC<
  Partial<FieldInputProps<any> & { label: string; className: string }>
>;
