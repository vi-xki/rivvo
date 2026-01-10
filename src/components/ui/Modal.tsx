import React from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-card border rounded-md p-6 w-full max-w-md z-10 bg-gray-50 dark:bg-gray-800">
        {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
