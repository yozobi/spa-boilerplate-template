import React, { useState } from 'react';
import { SelectBase } from './SelectBase';

export default { title: 'SelectBase' };

const options = [
  {
    value: 1,
    label: 'Option 1',
  },
  {
    value: 2,
    label: 'Option 2',
  },
];

export const Default = () => {
  const [selectedOption, setSelectedOption] = useState<
    typeof options[0] | null
  >(options[0]);

  return (
    <div className="p-6">
      <SelectBase
        options={options}
        value={selectedOption?.value || ''}
        label="A simple select component you can easily extend"
        labelAccessor={({ label }) => label}
        valueAccessor={(option) => option?.value || ''}
        onChange={(e) =>
          setSelectedOption(
            options.find(({ value }) => value === Number(e.target.value)) ||
              null,
          )
        }
      />
    </div>
  );
};
