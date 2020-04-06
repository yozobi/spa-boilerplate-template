import React, { useState } from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components';
import HeroIconX from '../HeroIcons/HeroIconX';

export default { title: 'Checkbox' };

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-bottom: 1px solid #ddd;
  padding: 1rem;
  @media (max-width: 620px) {
    flex-wrap: wrap;
  }
`;

const StateIndicator = styled.div`
  font-weight: bold;
`;

export const CheckboxStories = () => {
  const [isBox1Checked, setIsBox1Checked] = useState(false);
  const [isBox2Checked, setIsBox2Checked] = useState(false);
  const [isBox3Checked, setIsBox3Checked] = useState(false);
  const [isBox4Checked, setIsBox4Checked] = useState(true);

  const [box2, setBox2] = useState(0);
  const [box3, setBox3] = useState(0);

  return (
    <>
      <Container>
        <StateIndicator>Checkbox 1: Default</StateIndicator>
        <div>Checked: {isBox1Checked.toString()}</div>
        <Checkbox
          value="default"
          label="Default Checkbox"
          onChange={() => setIsBox1Checked(!isBox1Checked)}
          checked={isBox1Checked}
          labelClassName="tracking-wider text-gray-700 text-sm"
        />
        <br />
        <StateIndicator>
          Checkbox 2: label top, custom colour, custom border colour
        </StateIndicator>
        <div>Selected {box2.toString()} times</div>
        <Checkbox
          value="yes"
          color="green"
          highlightColor="green"
          icon={<polyline points="20 6 9 17 4 12" />}
          label="Box 2"
          onSelect={() => setBox2(box2 + 1)}
          onChange={() => setIsBox2Checked(!isBox2Checked)}
          checked={isBox2Checked}
          labelPosition="top"
          borderColor="black"
          labelClassName="tracking-wider text-gray-700 text-sm"
        />
        <br />
        <StateIndicator>
          Checkbox 3: label left, custom icon/colour
        </StateIndicator>
        <div>De-selected {box3.toString()} times</div>
        <Checkbox
          value="no"
          color="red"
          highlightColor="red"
          icon={
            <>
              <polyline points="6 6 18 18" />
              <polyline points="6 18 18 6" />
            </>
          }
          label="Box 3"
          onDeselect={() => setBox3(box3 + 1)}
          onChange={() => setIsBox3Checked(!isBox3Checked)}
          checked={isBox3Checked}
          labelPosition="left"
          labelClassName="tracking-wider text-gray-700 text-sm"
        />
        <br />
        <StateIndicator>
          Checkbox 4: selected by default, label bottom, custom icon
        </StateIndicator>
        <div>Checked: {isBox4Checked.toString()}</div>
        <Checkbox
          value="not applicable"
          // icon={<polyline points="4 12 20 12" />}
          icon={<HeroIconX />}
          label="Box 4"
          checked={isBox4Checked}
          labelPosition="bottom"
          onChange={() => setIsBox4Checked(!isBox4Checked)}
          labelClassName="tracking-wider text-gray-700 text-sm"
        />
      </Container>
    </>
  );
};
