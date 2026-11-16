import { useEffect, useState } from 'react';
import { ThemeColors, ThemeMode } from '@/modules/common/types/theme.types';

export const APPLE_CARD_THEME: ThemeColors = {
  accentColor: '#D97706',
  accentBg: 'rgba(217, 119, 6, 0.1)',
  heroGradient: 'linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(255,250,245,0.85) 100%)',
  cardBorder: 'rgba(217, 119, 6, 0.15)',
  lightGradient:
    'radial-gradient(at 10% 10%, rgba(255, 179, 138, 0.22) 0px, transparent 50%), radial-gradient(at 85% 15%, rgba(254, 218, 119, 0.22) 0px, transparent 55%), radial-gradient(at 50% 90%, rgba(247, 185, 235, 0.18) 0px, transparent 60%)',
  darkGradient:
    'radial-gradient(at 15% 15%, rgba(217, 119, 6, 0.15) 0px, transparent 50%), radial-gradient(at 85% 20%, rgba(219, 39, 119, 0.12) 0px, transparent 55%), radial-gradient(at 50% 90%, rgba(124, 58, 237, 0.1) 0px, transparent 60%)',
};

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('subwise-theme') ?? localStorage.getItem('subtrack-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('subwise-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('subwise-theme', 'light');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return {
    mode,
    isDark: mode === 'dark',
    toggleMode,
    theme: APPLE_CARD_THEME,
  };
}
