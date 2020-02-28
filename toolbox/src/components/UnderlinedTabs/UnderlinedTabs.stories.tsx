import React, { useState } from 'react';
import { UnderlinedTabs } from './UnderlinedTabs';
import { withKnobs, text } from '@storybook/addon-knobs';

export default { title: 'UnderlinedTabs', decorators: [withKnobs] };

export const withText = () => {
  const [activeTab, setActiveTab] = useState(1);
  const className = text(
    'tabClassname',
    'text-gray-700 text-xs uppercase tracking-wider focus:bg-gray-300 focus:outline-none px-6 h-12',
  );
  return (
    <div className="p-6">
      <UnderlinedTabs
        activeTab={activeTab}
        onChange={setActiveTab}
        tabs={[
          { value: 1, label: 'Zero' },
          { value: 2, label: 'Something' },
        ]}
        tabClassname={className}
      ></UnderlinedTabs>
    </div>
  );
};
