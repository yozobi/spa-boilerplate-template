export const mutationFormValidations = {
  required: (value: any) => {
    if (!value) {
      return 'This field is required.';
    }
  },
  mustBeNumber: (value: any) => {
    if (value && isNaN(value)) {
      return 'You must provide a valid number for this field.';
    }
  },
};

type Validation = keyof typeof mutationFormValidations;

type Config<V> = {
  [K in keyof V]?: Validation[];
};

/**
 * Returns a function you can use to validate useMutationForm
 */
export const validateMutationForm = <V extends {}>({
  config,
  values,
}: {
  values: V;
  config: Config<V>;
}) => {
  let errors: { [K in keyof V]?: string } = {};
  Object.entries(config).forEach(([key, validation]) => {
    let possibleError;
    if (
      mutationFormValidations[
        validation as keyof typeof mutationFormValidations
      ]
    ) {
      possibleError = mutationFormValidations[
        validation as keyof typeof mutationFormValidations
      ]((values as any)[key]);
    }
    if (possibleError) {
      errors[key as keyof V] = possibleError;
    }
  });
  if (Object.keys(errors).length > 0) {
    return errors;
  }
};
