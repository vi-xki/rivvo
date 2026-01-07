import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <label className="block w-full">
      {label && <div className="text-sm font-medium mb-1">{label}</div>}
      <input
        {...rest}
        className={`w-full p-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      />
    </label>
  );
}
