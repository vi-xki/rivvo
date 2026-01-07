import React, { createContext, useCallback, useContext, useState } from 'react';

type Toast = { id: string; title: string; description?: string };

const ToastContext = createContext<{ push: (t: Omit<Toast, 'id'>) => void } | null>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, 'id'>) => {
    const newToast = { ...t, id: Date.now().toString() };
    setToasts((s) => [newToast, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== newToast.id)), 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div key={t.id} className="bg-card border p-3 rounded shadow-md">
            <div className="font-medium">{t.title}</div>
            {t.description && <div className="text-sm text-muted-foreground">{t.description}</div>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
