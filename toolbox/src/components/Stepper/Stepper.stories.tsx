import React, { useState } from 'react';
import styled from 'styled-components';
import Stepper from './Stepper';
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

const steps = [
  {
    label: 'step 1 step step step step',
    value: '1',
  },
  {
    label: 'step 2',
    value: '2',
  },
  {
    label: 'step 3',
    value: '3',
  },
  {
    label: 'step 4',
    value: '4',
  },
];

export const StepperStory = () => {
  const [stepsCompleted, setStepsCompleted] = useState(['1']);
  return (
    <>
      <StepperContainer>
        <Stepper
          steps={steps}
          stepsCompleted={stepsCompleted}
          colorComplete="#282D4E"
          labelClassName="text-black-500"
        />
      </StepperContainer>
      <ButtonContainer>
        <ButtonBase onClick={() => setStepsCompleted([])}>Reset</ButtonBase>
        <ButtonBase onClick={() => setStepsCompleted(['1'])}>
          Complete Step 1
        </ButtonBase>
        <ButtonBase onClick={() => setStepsCompleted(['1', '2'])}>
          Complete Step 2
        </ButtonBase>
        <ButtonBase onClick={() => setStepsCompleted(['1', '2', '3'])}>
          Complete Step 3
        </ButtonBase>
        <ButtonBase onClick={() => setStepsCompleted(['1', '2', '3', '4'])}>
          Complete Step 4
        </ButtonBase>
      </ButtonContainer>
    </>
  );
};
