import { create } from 'zustand';

type Theme = 'light' | 'dark';

type ThemeState = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

export const useTheme = create<ThemeState>()((set) => {
  // initialize from localStorage if available
  const initial = (typeof window !== 'undefined' && (localStorage.getItem('theme') as Theme)) || 'light';
  if (typeof window !== 'undefined') {
    if (initial === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }

  return {
    theme: initial,
    setTheme: (t: Theme) => {
      set({ theme: t });
      if (typeof window !== 'undefined') {
        if (t === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', t);
      }
    },
    toggle: () => {
      set((s) => {
        const next = s.theme === 'dark' ? 'light' : 'dark';
        if (typeof window !== 'undefined') {
          if (next === 'dark') document.documentElement.classList.add('dark');
          else document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', next);
        }
        return { theme: next } as any;
      });
    },
  };
});

export default useTheme;
