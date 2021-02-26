import React, { useState } from 'react';
import styled from 'styled-components';
import RadioGroup from './RadioGroup';
import { select, text, color, withKnobs } from '@storybook/addon-knobs';

export default { title: 'RadioButton', decorators: [withKnobs] };

const Container = styled.fieldset`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  @media (max-width: 620px) {
    flex-wrap: wrap;
  }
`;

export const RadioButtonStory = () => {
  const defaultValueOverride = 'two';
  const [selected, setSelected] = useState(defaultValueOverride);

  const bgColor = color('bgColor', '#0FD9B9');
  const labelClassName = text('labelClassname', 'text-gray-600');
  const borderColor = color('borderColor', '#282D4E');
  const highlightColor = color('highlightColor', '#282D4E');
  const position = select(
    'labelPosition',
    ['right', 'left', 'bottom', 'top'],
    'right',
  );
  const flexDirection = select('flexDirection', ['row', 'column'], 'row');

  const radioItemsArray = [
    {
      label: 'label-one',
      value: 'one',
    },
    {
      label: 'label-two',
      value: 'two',
    },
    {
      label: 'label-three',
      value: 'three',
    },
    {
      label: 'label-four',
      value: 'four',
    },
  ];

  return (
    <>
      <Container>
        You have picked: {selected}
        <RadioGroup
          flexDirection={flexDirection}
          name="radio-story"
          options={radioItemsArray}
          labelPosition={position}
          color={bgColor}
          borderColor={borderColor}
          highlightColor={highlightColor}
          onChange={(e) => setSelected(e.target.value)}
          labelClassname={labelClassName}
          value={selected}
        />
      </Container>
    </>
  );
};
