import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/store/useTheme';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useTheme((state) => state.theme);
  const toggle = useTheme((state) => state.toggle);

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      className={`inline-flex items-center justify-center p-2 rounded-md transition-colors hover:bg-muted/5 ${className}`}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
