import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'secondary' | 'highlight';
};

export default function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-transform transition-colors shadow-sm';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95 shadow'
      : variant === 'secondary'
      ? 'bg-accent text-white hover:opacity-95 active:scale-95'
      : variant === 'highlight'
      ? 'bg-highlight text-white hover:bg-highlight/90 active:scale-95 shadow'
      : 'bg-transparent text-foreground hover:bg-muted/5';

  return (
    <button className={`${base} ${styles} ${className}`} {...rest}>
      {children}
    </button>
  );
}
