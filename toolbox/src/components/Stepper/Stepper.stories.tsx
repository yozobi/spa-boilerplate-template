import React, { useState } from 'react';
import styled from 'styled-components';
import Stepper from './DeprecatedStepper';
import ButtonBase from '../ButtonBase/ButtonBase';
export default { title: 'Stepper' };

const StepperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px;
  margin-bottom: 20px;
`;
const ButtonContainer = styled.div`
  & > button + button {
    margin-left: 0.4rem;
  }
`;

export const StepperStory = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  return (
    <>
      <StepperContainer>
        <Stepper
          steps={['step 1 step step step step', 'step 2', 'step 3', 'step 4']}
          currentStep={currentStep}
          colorComplete="#282D4E"
          labelClassName="text-black-500"
        />
      </StepperContainer>
      <ButtonContainer>
        <ButtonBase onClick={() => setCurrentStep(0)}>Reset</ButtonBase>
        <ButtonBase onClick={() => setCurrentStep(1)}>
          Complete Step 1
        </ButtonBase>
        <ButtonBase onClick={() => setCurrentStep(2)}>
          Complete Step 2
        </ButtonBase>
        <ButtonBase onClick={() => setCurrentStep(3)}>
          Complete Step 3
        </ButtonBase>
        <ButtonBase onClick={() => setCurrentStep(4)}>
          Complete Step 4
        </ButtonBase>
      </ButtonContainer>
    </>
  );
};
