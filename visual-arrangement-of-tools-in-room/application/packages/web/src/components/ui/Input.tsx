import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  labelText?: string;
}

export const Input: React.FC<InputProps> = ({ containerClassName, labelText, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block mb-2 text-sm font-medium text-gray-900">
      {labelText}
    </label>
    <input
      type="text"
      id={id}
      className="bg-primary-50 border border-gray-300 text-gray-900 text-sm rounded-lg transition-all focus:outline-primary-500 focus:border-primary-500 block w-full p-2.5"
      {...props}
    />
  </div>
);
