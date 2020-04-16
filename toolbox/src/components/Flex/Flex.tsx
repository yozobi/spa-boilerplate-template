import React from 'react';
import styled, { css } from 'styled-components';
import { spacing } from '../../theme/spacing';

export interface FlexProps {
  flexDirection?: 'column' | 'row';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between';
  mx?: keyof typeof spacing;
  my?: keyof typeof spacing;
  className?: string;
}

export const Flex: React.FC<FlexProps> = ({
  children,
  flexDirection = 'row',
  alignItems = 'flex-start',
  mx = 6,
  my = 2,
  justifyContent = 'flex-start',
  className,
}) => {
  return (
    <StyledFlex
      className={className}
      flexDirection={flexDirection}
      mx={mx}
      my={my}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </StyledFlex>
  );
};

export default Flex;

const StyledFlex = styled.div<
  Required<
    Pick<
      FlexProps,
      'mx' | 'my' | 'alignItems' | 'justifyContent' | 'flexDirection'
    >
  >
>`
  ${(props) => css`
    justify-content: ${props.justifyContent};
    flex-direction: ${props.flexDirection};
    align-items: ${props.alignItems};
    display: flex;
    & > *:not(:last-child) {
      ${props.flexDirection === 'row'
        ? css`
            margin-right: ${spacing[props.mx]};
          `
        : ''}
      ${props.flexDirection === 'column'
        ? css`
            margin-bottom: ${spacing[props.my]};
          `
        : ''}
    }
  `}
`;
