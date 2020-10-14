import React from 'react';
import styled from 'styled-components';

export type LabelPositionType = 'top' | 'bottom' | 'left' | 'right';

const RadioContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const RadioLabel = styled.label<{
  labelPosition: LabelPositionType;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ labelPosition }) => labelPositionOptions[labelPosition]};
  color: #333;
  cursor: pointer;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 10px;
`;

const StyledRadio = styled.div<{
  color?: string;
  labelPosition?: LabelPositionType;
  borderColor?: string;
  highlightColor?: string;
}>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition: border 150ms;
  cursor: pointer;
  border: 1px solid ${(props) => props.borderColor};
  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.highlightColor};
  }
  ${HiddenRadio}:checked + & {
    border: 10px solid ${(props) => props.color};
    border-radius: 50%;
  }
`;

const LabelText = styled.span<{ labelPosition?: LabelPositionType }>`
  margin: ${(props) =>
    props.labelPosition === 'top'
      ? '0 0 10px 0'
      : props.labelPosition === 'bottom'
      ? '10px 0 0 0'
      : props.labelPosition === 'right'
      ? '0 0 0 10px'
      : props.labelPosition === 'left'
      ? '0 10px 0 0'
      : '0'};
`;

const labelPositionOptions = {
  top: 'column-reverse',
  bottom: 'column',
  left: 'row-reverse',
  right: 'row',
};

export interface IRadioButtonProps {
  group: string;
  value: string;
  label?: string;
  color?: string;
  borderColor?: string;
  highlightColor?: string;
  checked?: boolean;
  labelPosition?: LabelPositionType;
  labelClassname?: string;
  onSelect: () => void;
  id?: string;
}

const RadioButton = (props: IRadioButtonProps) => {
  const { labelPosition, color, label, ...rest } = props;

  const onChange = () => {
    props.onSelect();
  };

  return (
    <RadioContainer>
      <RadioLabel labelPosition={props.labelPosition || 'right'}>
        <HiddenRadio
          {...rest}
          onChange={onChange}
          name={props.group}
          checked={props.checked}
        />
        <StyledRadio
          color={props.color}
          borderColor={props.borderColor}
          labelPosition={props.labelPosition || 'right'}
          highlightColor={props.highlightColor}
        />
        <LabelText
          labelPosition={props.labelPosition || 'right'}
          className={props.labelClassname}
        >
          {props.label || 'Label'}
        </LabelText>
      </RadioLabel>
    </RadioContainer>
  );
};
export default RadioButton;
