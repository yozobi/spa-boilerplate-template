import React from 'react';

interface PlaceholderProps {
  title?: string;
  className?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({
  className,
  title = 'placeholder',
}) => {
  return (
    <div
      className={
        'bg-gray-300 flex justify-center items-center text-gray-700 overflow-hidden ' +
        (className || '')
      }
    >
      <span className={'text-xs uppercase'}>{title}</span>
    </div>
  );
};

export default Placeholder;
