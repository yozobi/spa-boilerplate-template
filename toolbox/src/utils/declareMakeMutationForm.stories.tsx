import React from 'react';
import { TextInput } from '../components/TextInput/TextInput';
import Flex from '../components/Flex/Flex';
import { declareMakeMutationForm } from './declareMakeMutationForm';

export default { title: 'Form Setup' };

/**
 * We declare one of these per project,
 * which defines which form elements are available
 */
const makeMutationForm = declareMakeMutationForm({
  inputs: {
    text: (props: any) => <TextInput {...props} />,
    password: (props: any) => <TextInput {...props} type="password" />,
  },
});

/**
 * Local to the component, we create a form
 * with inputs checked by typescript.
 *
 * Checking the inputs with Typescript types
 * means we can pull them from the API, meaning our
 * form inputs always stay accurate to what the API needs.
 */
const LoginForm = makeMutationForm<{ email: string; password: string }>({
  config: {
    email: {
      type: 'text',
      label: 'Email',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
});

export const Default = () => (
  <div className="p-6">
    <LoginForm.Wrapper
      initialValues={{}}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <Flex flexDirection="column" my={6}>
        <LoginForm.Inputs.email />
        <LoginForm.Inputs.password />
        <button>Submit</button>
      </Flex>
    </LoginForm.Wrapper>
  </div>
);

const LoginFormWithValidation = makeMutationForm<{
  email: string;
  password: string;
}>({
  config: {
    email: {
      type: 'text',
      label: 'Email',
    },
    password: {
      label: 'Password',
      type: 'password',
    },
  },
  /**
   * We can also add validation in the config of the form.
   */
  validate: (values) => {
    if (!values.email) {
      return {
        email: 'Please enter your email address.',
      };
    }
    if (!values.password) {
      return {
        password: 'Please enter your password.',
      };
    }
  },
});

export const WithValidation = () => (
  <div className="p-6">
    <LoginFormWithValidation.Wrapper
      initialValues={{}}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
      /**
       * If we wanted to, we could also add validation
       * as a prop here to override any config.
       */
    >
      <Flex flexDirection="column" my={6}>
        <LoginFormWithValidation.Inputs.email />
        <LoginFormWithValidation.Inputs.password />
        <button>Submit</button>
      </Flex>
    </LoginFormWithValidation.Wrapper>
  </div>
);
