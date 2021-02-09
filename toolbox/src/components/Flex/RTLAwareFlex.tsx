import React from 'react';
import classNames from 'classnames';
import { AlignItems, FlexProps, JustifyContent } from './Flex';

export const alignItems: Record<AlignItems, string> = {
  'flex-end': 'items-end',
  'flex-start': 'items-start',
  center: 'items-center',
  stretch: 'items-stretch',
};

export const justifyContent: Record<JustifyContent, string> = {
  'flex-end': 'justify-end',
  'flex-start': 'justify-start',
  center: 'justify-center',
  'space-between': 'justify-between',
};

export const RTLAwareFlex: React.FC<Omit<FlexProps, 'mx' | 'my'>> = (props) => {
  return (
    <div
      className={classNames(
        `flex`,
        `rtl:space-x-reverse`,
        props.flexDirection === 'column' && 'flex-col',
        props.flexDirection === 'row' && 'flex-row',
        alignItems[props.alignItems || 'flex-start'],
        justifyContent[props.justifyContent || 'flex-start'],
        props.className?.includes('space-x-') ? '' : 'space-x-6',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
};

export default RTLAwareFlex;
