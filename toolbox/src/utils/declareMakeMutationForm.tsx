import {
  FormikProvider,
  useField,
  useFormik,
  useFormikContext,
  FormikContextType,
} from 'formik';
import React from 'react';

interface DeclareMakeMutationFormParams<T extends {}> {
  inputs: T;
}

type InputsBase<InputMap extends {}> = {
  [K in keyof InputMap]: React.FC<InputMap[K]>;
};

type InputsType<MutationVariables, Inputs extends InputsBase<any>> = {
  [K in keyof Required<MutationVariables>]: React.FC<
    Parameters<
      Inputs[MutationFormConfig<Required<MutationVariables>, Inputs>[K]['type']]
    >[0]
  >;
};

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
export function declareMakeMutationForm<Inputs extends InputsBase<any>>({
  inputs,
}: DeclareMakeMutationFormParams<Inputs>) {
  interface MakeMutationFormParams<V extends {}, T extends {}> {
    config: MutationFormConfig<V, T>;
    validate?: (values: V) => { [K in keyof V]?: string } | void;
    showErrorsOnTouched?: boolean;
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
    showErrorsOnTouched,
  }: MakeMutationFormParams<MutationVariables, Inputs>): {
    Inputs: InputsType<MutationVariables, Inputs>;
    Wrapper: React.FC<MutationFormWrapperProps<MutationVariables>>;
    Consumer: React.FC<{
      children: React.FC<FormikContextType<MutationVariables>>;
    }>;
  } {
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
        initialValues: (initialValues || {}) as MutationVariables,
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
    const Inputs: InputsType<MutationVariables, Inputs> = Object.keys(
      config,
    ).reduce((obj, key) => {
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
          let shouldShowError = submitCount > 0;
          if (showErrorsOnTouched) {
            shouldShowError = metaProps.touched || submitCount > 0;
          }
          return (
            // @ts-ignore
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

    const Consumer = function({
      children,
    }: {
      children: React.FC<FormikContextType<MutationVariables>>;
    }) {
      const formikProps = useFormikContext<MutationVariables>();
      return <>{children(formikProps)}</>;
    };

    return {
      Wrapper,
      Inputs,
      Consumer,
    };
  };
}

interface MutationFormWrapperProps<V> {
  initialValues?: Partial<V>;
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
