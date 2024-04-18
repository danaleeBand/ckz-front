import { THEME_TYPES } from '@/constants';

export const applyTheme = (theme: string) => {
  const isDarkMode = theme === THEME_TYPES.THEME_DARK;
  const root = document.documentElement;

  if (isDarkMode) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};
