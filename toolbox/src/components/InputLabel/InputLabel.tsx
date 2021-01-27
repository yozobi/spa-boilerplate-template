import React from 'react';

interface IInputLabelProps {
  isHint?: boolean;
  isError?: boolean;
  children: any;
  htmlFor?: string;
}

const InputLabel = (props: IInputLabelProps) => {
  return props.isHint ? (
    <label htmlFor={props.htmlFor} className="block mb-2 text-sm text-gray-600">
      {props.children}
    </label>
  ) : props.isError ? (
    <label
      htmlFor={props.htmlFor}
      className="block mb-2 text-sm font-semibold text-primary-700"
    >
      {props.children}
    </label>
  ) : (
    <label
      className="block mb-2 text-sm tracking-wider text-gray-700 uppercase"
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
};

export default InputLabel;
