import React, { InputHTMLAttributes, ChangeEvent } from 'react';
import styled from 'styled-components';

type labelPositionType = 'top' | 'bottom' | 'left' | 'right';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;
const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;

const CheckBoxLabel = styled.label<{
  labelPosition: labelPositionType;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ labelPosition }) => labelPositionOptions[labelPosition]};
  color: #333;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
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

const StyledCheckbox = styled.div<{
  checked?: boolean;
  color?: string;
  borderColor?: string;
  highlightColor?: string;
  labelPosition: labelPositionType;
}>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin: ${(props) =>
    props.labelPosition === 'top'
      ? '8px 0 0 0'
      : props.labelPosition === 'bottom'
      ? '0 0 8px 0'
      : props.labelPosition === 'right'
      ? '0 8px 0 0'
      : props.labelPosition === 'left'
      ? '0 0 0 8px'
      : '0'};
  background-color: ${(props) => (props.checked ? props.color : 'unset')};
  transition: all 150ms;
  border: 1px solid
    ${(props) => (props.checked ? props.color : props.borderColor || '#000')};
  cursor: pointer;
  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px ${(props) => props.highlightColor || '#000'};
    border-color: ${(props) => props.highlightColor || '#000'};
  }
  ${Icon} {
    visibility: ${(props) => (props.checked ? 'visible' : 'hidden')};
  }
`;

const labelPositionOptions = {
  top: 'column-reverse',
  bottom: 'column',
  left: 'row-reverse',
  right: 'row',
};

interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: string;
  label?: string;
  color?: string;
  borderColor?: string;
  checked?: boolean;
  highlightColor?: string;
  labelPosition?: labelPositionType;
  icon?: React.ReactNode;
  /** What classes you'd like to apply to the text element in the label */
  labelClassName?: string;
  onSelect?: () => void;
  onDeselect?: () => void;
}

const Checkbox = (props: ICheckBoxProps) => {
  const {
    labelPosition = 'right',
    onChange,
    onDeselect,
    onSelect,
    icon,
    color,
    labelClassName,
    label,
    className,
    ...rest
  } = props;

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e);
    }
    if (props.onSelect && !props.checked) {
      props.onSelect();
    }
    if (props.onDeselect && props.checked) {
      props.onDeselect();
    }
  };

  return (
    <CheckboxContainer className={className}>
      <CheckBoxLabel labelPosition={labelPosition}>
        <HiddenCheckbox
          {...rest}
          type="checkbox"
          onChange={handleCheckboxChange}
          name={props.name}
          checked={props.checked}
        />
        <StyledCheckbox
          labelPosition={labelPosition}
          checked={props.checked}
          color={props.color || '#000'}
          borderColor={props.borderColor}
          highlightColor={props.highlightColor}
        >
          <Icon viewBox="0 0 24 24">
            {props.icon || <polyline points="20 6 9 17 4 12" />}
          </Icon>
        </StyledCheckbox>
        <span className={labelClassName}>{props.label}</span>
      </CheckBoxLabel>
    </CheckboxContainer>
  );
};
export default Checkbox;
