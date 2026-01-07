import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

export default function Input({ label, className = '', ...rest }: Props) {
  return (
    <label className="block w-full">
      {label && <div className="text-sm font-medium mb-1 text-muted-foreground">{label}</div>}
      <input
        {...rest}
        className={`w-full p-3 border rounded-lg bg-card text-foreground placeholder:text-muted-foreground border-border focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:opacity-60 transition ${className}`}
      />
    </label>
  );
}
