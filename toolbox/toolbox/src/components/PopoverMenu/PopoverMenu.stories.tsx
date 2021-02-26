import React, { useState } from 'react';
import PopoverMenu from './PopoverMenu';
import HeroIconClipboard from '../HeroIcons/HeroIconClipboard';
import HeroIconAnnouncement from '../HeroIcons/HeroIconAnnouncement';
import HeroIconArchive from '../HeroIcons/HeroIconArchive';
import HeroIconAtSymbol from '../HeroIcons/HeroIconAtSymbol';
import styled from 'styled-components';
import { withKnobs, color } from '@storybook/addon-knobs';

const MenuButtonContainer = styled.div`
  max-width: 300px;
  width: 100%;
`;

export default { title: 'Popover Menu', decorators: [withKnobs] };

const options = [
  {
    name: 'Option 1',
    icon: <HeroIconClipboard />,
    onClick: () => console.log('Option 1'),
  },
  {
    name: 'Option 2',
    icon: <HeroIconAnnouncement />,
    onClick: () => console.log('Option 2'),
  },
  {
    name: 'Option 3',
    icon: <HeroIconArchive />,
    onClick: () => console.log('Option 3'),
  },
  {
    name: 'Option 4',
    icon: <HeroIconAtSymbol />,
    onClick: () => console.log('Option 4'),
  },
];

export const PopoverMenuStory = () => {
  const textColor = color('textColor', '#03D8B9');
  const backgroundColor = color('backgroundColor', '#323B5A');
  const hoverBackground = color('hoverBackground', '#03D8B9');
  const hoverTextColor = color('hoverTextColor', '#323B5A');

  const [isOpen, setMenuOpen] = useState(false);

  return (
    <>
      <MenuButtonContainer>
        <PopoverMenu
          options={options}
          isOpen={isOpen}
          setMenuOpen={setMenuOpen}
          textColor={textColor}
          backgroundColor={backgroundColor}
          hoverBackground={hoverBackground}
          hoverTextColor={hoverTextColor}
        />
      </MenuButtonContainer>
      <h2>
        This is the other stuff on the page that shouldnt be affected by the
        menu
      </h2>
    </>
  );
};
