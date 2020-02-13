import React from 'react';
import { TextInput } from './TextInput';
import Flex from '../Flex/Flex';
import ButtonBase from '../ButtonBase/ButtonBase';

export default { title: 'TextInput' };

export const withLabel = () => (
  <div className="p-6">
    <Flex flexDirection="column" my={6}>
      <TextInput label="Name" name="name"></TextInput>
      <TextInput label="Password" name="password"></TextInput>
      <ButtonBase>Submit</ButtonBase>
    </Flex>
  </div>
);
