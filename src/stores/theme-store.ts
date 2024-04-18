import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { THEME_TYPES } from '@/constants';

const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;

export type ThemeStore = {
  theme: string;
  setTheme: (_: string) => void;
};

export const useThemeStore = create(
  persist<ThemeStore>(
    set => ({
      theme: THEME_LIGHT,
      setTheme: (newTheme: string) =>
        set({ theme: newTheme === THEME_DARK ? THEME_DARK : THEME_LIGHT }),
    }),
    {
      name: 'theme-store',
    },
  ),
);
