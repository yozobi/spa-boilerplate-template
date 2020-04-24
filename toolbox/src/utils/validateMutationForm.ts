const validations = {
  required: (value: any) => {
    if (!value) {
      return 'This field is required.';
    }
  },
};

type Validation = keyof typeof validations;

type Config<V> = {
  [K in keyof V]?: Validation[];
};

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
    if (validations[validation as keyof typeof validations]) {
      possibleError = validations[validation as keyof typeof validations](
        (values as any)[key],
      );
    }
    if (possibleError) {
      errors[key as keyof V] = possibleError;
    }
  });
  if (Object.keys(errors).length > 0) {
    return errors;
  }
};
