import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_TYPES } from '@/constants';

const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;

export type ThemeStore = {
  theme: string;
  setTheme: (_: string) => void;
};

const storedTheme = localStorage.getItem('theme-store');
const parsedTheme = storedTheme ? JSON.parse(storedTheme) : {};

const initialTheme =
  parsedTheme?.state?.theme === THEME_DARK ||
  (!('theme-store' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? THEME_DARK
    : THEME_LIGHT;

export const useThemeStore = create(
  persist<ThemeStore>(
    set => ({
      theme: initialTheme,
      setTheme: (newTheme: string) =>
        set({ theme: newTheme === THEME_DARK ? THEME_DARK : THEME_LIGHT }),
    }),
    {
      name: 'theme-store',
    },
  ),
);
