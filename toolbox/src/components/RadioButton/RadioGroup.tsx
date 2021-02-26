import React from 'react';
import RadioButton, { LabelPositionType } from './RadioButton';
import Flex from '../Flex/Flex';
import { spacing } from '../../theme/spacing';

export interface IRadioGroupProps {
  value?: string;
  options: {
    value: string;
    label: string;
  }[];
  color?: string;
  borderColor?: string;
  highlightColor?: string;
  name: string;
  labelPosition?: LabelPositionType;
  labelClassname?: string;
  /**
   * We mimic an event object to make
   * Formik happy
   */
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  flexDirection?: 'column' | 'row';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  mx?: keyof typeof spacing;
  my?: keyof typeof spacing;
  className?: string;
}

const RadioGroup = (props: IRadioGroupProps) => {
  const handleCheckboxChange = (value: string) => {
    props.onChange?.({ target: { value, name: props.name } });
  };

  return (
    <Flex
      className={props.className}
      flexDirection={props.flexDirection}
      alignItems={props.alignItems}
      justifyContent={props.justifyContent}
      my={props.my}
      mx={props.mx}
    >
      {props.options.map((radioItem, index) => {
        return (
          <RadioButton
            key={index}
            onSelect={() => handleCheckboxChange(radioItem.value)}
            checked={props.value === radioItem.value}
            value={radioItem.value}
            label={radioItem.label}
            id={props.name}
            color={props.color}
            borderColor={props.borderColor}
            highlightColor={props.highlightColor}
            group={props.name}
            labelPosition={props.labelPosition}
            labelClassname={props.labelClassname}
          />
        );
      })}
    </Flex>
  );
};

export default RadioGroup;
