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
  roundedCorners?: boolean;
  focusRing?: boolean;
}>`
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: ${(props) => (props.roundedCorners ? '5px' : '0px')};
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
    ${(props) =>
      props.focusRing === true
        ? `box-shadow: 0 0 0 3px ${props.highlightColor || '#000'};`
        : `box-shadow: none`}
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

export interface ICheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  value?: any;
  label?: string;
  color?: string;
  errorClassName?: string;
  error?: string;
  borderColor?: string;
  roundedCorners?: boolean;
  focusRing?: boolean;
  checked?: boolean;
  highlightColor?: string;
  labelPosition?: labelPositionType;
  icon?: React.ReactNode;
  /** What classes you'd like to apply to the text element in the label */
  labelClassName?: string;
  onSelect?: () => void;
  onDeselect?: () => void;
  checkboxClassName?: string;
}

const Checkbox = ({
  roundedCorners = true,
  focusRing = true,
  ...props
}: ICheckBoxProps) => {
  const { labelPosition = 'right', labelClassName, className } = props;

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

  // console.log(focusRing);

  return (
    <div className={className}>
      <CheckboxContainer>
        <CheckBoxLabel labelPosition={labelPosition}>
          <HiddenCheckbox
            {...props}
            type="checkbox"
            onChange={handleCheckboxChange}
            name={props.name}
            checked={props.checked}
          />
          <StyledCheckbox
            className={`${props.checkboxClassName} flex-shrink-0`}
            labelPosition={labelPosition}
            checked={props.checked}
            color={props.color || '#000'}
            borderColor={props.borderColor}
            highlightColor={props.highlightColor}
            roundedCorners={roundedCorners}
            focusRing={focusRing}
          >
            <Icon viewBox="0 0 24 24">
              {props.icon || <polyline points="20 6 9 17 4 12" />}
            </Icon>
          </StyledCheckbox>
          <span className={labelClassName}>{props.label}</span>
        </CheckBoxLabel>
      </CheckboxContainer>
      {props.error && (
        <span className={props.errorClassName}>{props.error}</span>
      )}
    </div>
  );
};
export default Checkbox;
