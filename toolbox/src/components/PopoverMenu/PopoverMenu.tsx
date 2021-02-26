import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import Stack from '../Stack/Stack';

const MenuWrapper = styled.div<{
  textColor?: string;
  backgroundColor?: string;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  color: ${(props) => (props.textColor ? props.textColor : '#000')};
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
`;

const MenuButton = styled.button<{
  backgroundColor?: string;
  textColor?: string;
}>`
  width: 100%;

  display: flex;
  height: 3.2rem;
  align-items: center;
  justify-content: center;
  transition: border 150ms;
  border: 1px solid ${(props) => (props.textColor ? props.textColor : '#000')};

  &:focus {
    outline: none;
    border: 10px solid
      ${(props) => (props.textColor ? props.textColor : '#000')};
  }
`;

const MenuItems = styled.ul<{ backgroundColor?: string }>`
  box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 0px 1px inset,
    rgba(39, 44, 49, 0.06) 0px 2px 2px, rgba(39, 44, 49, 0.06) 0px 4px 4px,
    rgba(39, 44, 49, 0.06) 0px 8px 8px, rgba(39, 44, 49, 0.06) 0px 16px 16px,
    rgba(39, 44, 49, 0.06) 0px 32px 32px, rgba(39, 44, 49, 0.06) 0px 64px 64px;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
  position: absolute;
  width: 100%;
  top: 3.2rem;
`;
const MenuListItem = styled.li<{
  hoverBackground?: string;
  hoverTextColor?: string;
}>`
  padding: 1rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${(props) =>
      props.hoverBackground ? props.hoverBackground : '#000'};
    color: ${(props) => (props.hoverTextColor ? props.hoverTextColor : '#000')};
  }
`;

const IconContainer = styled.div`
  margin-right: 1rem;
`;

interface PopoverMenuProps {
  menuTitle?: string | React.ReactNode;
  className?: string;
  options: { name: string; icon?: React.ReactNode; onClick: () => void }[];
  hoverBackground?: string;
  backgroundColor?: string;
  textColor?: string;
  hoverTextColor?: string;
  setMenuOpen: (open: boolean) => void;
  isOpen: boolean;
}

const PopoverMenu: React.FC<PopoverMenuProps> = ({
  className,
  menuTitle = 'Menu',
  options,
  hoverBackground,
  backgroundColor,
  textColor,
  hoverTextColor,
  isOpen,
  setMenuOpen,
}) => {
  const ref = useRef(null);

  useOnClickOutside({
    ref: ref,
    handler: () => {
      if (isOpen) {
        setMenuOpen(false);
      }
    },
  });

  return (
    <MenuWrapper
      ref={ref}
      backgroundColor={backgroundColor}
      textColor={textColor}
    >
      <MenuButton onClick={() => setMenuOpen(!isOpen)} textColor={textColor}>
        {menuTitle}
      </MenuButton>
      {isOpen && (
        <MenuItems backgroundColor={backgroundColor}>
          <Stack my={6}>
            {options.map((option, i) => {
              return (
                <MenuListItem
                  key={i}
                  hoverBackground={hoverBackground}
                  hoverTextColor={hoverTextColor}
                  onClick={option.onClick}
                >
                  {option.icon && <IconContainer>{option.icon}</IconContainer>}
                  {option.name}
                </MenuListItem>
              );
            })}
          </Stack>
        </MenuItems>
      )}
    </MenuWrapper>
  );
};

export default PopoverMenu;
