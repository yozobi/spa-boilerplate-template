import React from 'react';
import styled from 'styled-components';

type LabelPosition = 'top' | 'bottom';

const Progress = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ProgressSteps = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const StepItem = styled.div<{
  isComplete?: boolean;
  colorComplete?: string;
  labelPosition?: LabelPosition;
}>`
  color: ${(props) => (props.isComplete ? props.colorComplete : '#000')};
  width: 100px;
  display: flex;
  align-items: center;
  flex-direction: ${(props) =>
    props.labelPosition === 'top' ? 'column-reverse' : 'column'};
`;

const Step = styled.div<{
  colorComplete?: string;
  isComplete?: boolean;
}>`
  background-color: #ccc;
  transition: border 150ms;
  border: ${(props) => (props.isComplete ? '10px' : '1px')} solid
    ${(props) => (props.isComplete ? props.colorComplete : '#ccc')};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  z-index: 2;
  flex-shrink: 0;
  position: relative;
`;

const Bar = styled.div<{
  labelPosition?: LabelPosition;
  colorComplete?: string;
}>`
  background-color: #ccc;
  overflow: hidden;
  position: absolute;
  top: ${(props) => (props.labelPosition === 'top' ? 'unset' : '6px')};
  left: 50px;
  right: 50px;
  bottom: ${(props) => (props.labelPosition === 'top' ? '6px' : 'unset')};
`;

const BarProgress = styled.div<{
  width?: number;
  colorComplete?: string;
}>`
  height: 8px;
  background-color: ${(props) =>
    props.colorComplete ? props.colorComplete : '#000'};
  width: ${(props) => props.width}%;
  transition: width 1.1s cubic-bezier(0.17, 0.49, 0, 1.04);
`;

const Label = styled.div<{
  isComplete?: boolean;
  labelPosition?: LabelPosition;
  colorComplete?: string;
}>`
  padding: 5px 10px;
  background: #eee;
  width: 100px;
  text-align: center;
  margin: 0.4rem 0;
  transform: translate(
    0,
    ${(props) =>
      props.isComplete
        ? props.labelPosition === 'top'
          ? ' -.6rem'
          : '.6rem'
        : '0'}
  );
  transition: transform 0.5s cubic-bezier(0.17, 0.49, 0, 1.04);
  will-change: transform;
`;

interface DeprecatedStepperProps {
  steps: string[];
  currentStep: number;
  borderColor?: string;
  colorComplete?: string;
  labelPosition?: LabelPosition;
  labelClassName?: string;
}

const DeprecatedStepper = (props: DeprecatedStepperProps) => {
  const totalSteps = props.steps.length;
  return (
    <Progress>
      <Bar
        labelPosition={props.labelPosition}
        colorComplete={props.colorComplete}
      >
        <BarProgress
          width={(props.currentStep / (totalSteps - 1)) * 100}
          colorComplete={props.colorComplete}
        />
      </Bar>
      <ProgressSteps>
        {props.steps.map((step, i) => {
          const isStepComplete = props.currentStep >= i;
          return (
            <StepItem
              isComplete={isStepComplete}
              key={i}
              labelPosition={props.labelPosition}
            >
              <Step
                colorComplete={props.colorComplete}
                isComplete={isStepComplete}
              />
              <Label
                isComplete={isStepComplete}
                labelPosition={props.labelPosition}
                className={props.labelClassName}
              >
                {step}
              </Label>
            </StepItem>
          );
        })}
      </ProgressSteps>
    </Progress>
  );
};

export default DeprecatedStepper;
