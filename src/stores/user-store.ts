import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type userStore = {
  name: string | null;
  profileImageUrl: string | null;
  setUserName: (name: string | null) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
};

export const useUserStore = create(
  persist<userStore>(
    set => ({
      name: null,
      profileImageUrl: null,
      setUserName: (name: string | null) => set({ name }),
      setProfileImageUrl: (profileImageUrl: string | null) =>
        set({ profileImageUrl }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
