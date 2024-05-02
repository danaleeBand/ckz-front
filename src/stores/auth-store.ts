import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthStore = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      accessToken: null,
      setAccessToken: (accessToken: string | null) => set({ accessToken }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);
