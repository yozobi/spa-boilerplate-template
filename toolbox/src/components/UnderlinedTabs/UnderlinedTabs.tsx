import classNames from 'classnames';
import React from 'react';
import styled from 'styled-components';

interface UnderlinedTabsProps<T> {
  tabs: {
    value: T;
    label: string;
    renderItem?: React.FC<{ onSelect: () => void; isActive: boolean }>;
  }[];
  activeTab: T;
  onChange: (value: T) => void;
  tabClassname?: string;
}

export function UnderlinedTabs<T extends string | number>({
  tabs,
  activeTab,
  onChange,
  tabClassname,
}: UnderlinedTabsProps<T>) {
  return (
    <div className="flex">
      {tabs.map((tab) => {
        if (tab.renderItem) {
          const Component = tab.renderItem;
          return (
            <Component
              key={tab.value}
              onSelect={() => onChange(tab.value)}
              isActive={activeTab === tab.value}
            />
          );
        }
        return (
          <StyledButton
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={classNames(
              'border-b-4',
              activeTab === tab.value && 'border-primary-400',
              tabClassname,
            )}
          >
            <p>{tab.label}</p>
          </StyledButton>
        );
      })}
    </div>
  );
}

export default UnderlinedTabs;

const StyledButton = styled.button`
  transition: border-color 0.3s;
`;
