import { Moon, Sun } from 'lucide-react';
import { useWorkspace } from '../../hooks/useWorkspace';

export default function ThemeToggle({ compact = false }) {
  const { theme, setTheme } = useWorkspace();
  const nextTheme = theme === 'light' ? 'dark' : 'light';
  return (
    <button
      className={`icon-button theme-toggle ${compact ? 'compact' : ''}`}
      type="button"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      aria-pressed={theme === 'dark'}
      title={`Switch to ${nextTheme} mode`}
    >
      {theme === 'light' ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}
      {!compact && <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>}
    </button>
  );
}
