import React from 'react';
import styled from 'styled-components';

const LabelDefault = styled.label`
  color: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
`;

const LabelHint = styled.label`
  color: ${(props) => props.theme?.colors?.gray[600]};
  font-size: 1.125rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
`;

const LabelError = styled.label`
  color: ${(props) => props.theme?.colors?.danger[700] || ''};
  font-size: 1.125rem;
  font-weight: 600;
  display: block;
  margin-bottom: 0.4rem;
`;

interface IInputLabelProps {
  isHint?: boolean;
  isError?: boolean;
  children: any;
  htmlFor?: string;
}

const InputLabel = (props: IInputLabelProps) => {
  return props.isHint ? (
    <LabelHint htmlFor={props.htmlFor}>{props.children}</LabelHint>
  ) : props.isError ? (
    <LabelError htmlFor={props.htmlFor}>{props.children}</LabelError>
  ) : (
    <LabelDefault htmlFor={props.htmlFor}>{props.children}</LabelDefault>
  );
};

export default InputLabel;
