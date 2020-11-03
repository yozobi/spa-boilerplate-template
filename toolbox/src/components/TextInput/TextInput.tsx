import React from 'react';

export const TextInput: React.FC<React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
}> = ({
  value,
  name,
  onChange,
  onBlur,
  label,
  type = 'text',
  error,
  className,
}) => {
  return (
    <label htmlFor={name} className="flex flex-col">
      <span className="block mb-2 text-xs text-gray-700">{label}</span>
      <input
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        className={`py-4 px-4 border-b-4 bg-gray-100 border-gray-400 focus:border-primary-400 focus:outline-none text-gray-700 text-sm ${
          error ? 'border-red-400 focus:border-red-700' : ''
        } ${className}`}
        onBlur={onBlur}
      />
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </label>
  );
};

export default TextInput;
