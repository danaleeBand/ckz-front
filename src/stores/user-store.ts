import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type userStore = {
  name: string | null;
  profileImageUrl: string | null;
  setUserName: (name: string | null) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
  logout: () => void;
};

const initialState: Omit<
  userStore,
  'setUserName' | 'setProfileImageUrl' | 'logout'
> = {
  name: null,
  profileImageUrl: null,
};

export const useUserStore = create(
  persist<userStore>(
    set => ({
      ...initialState,
      setUserName: (name: string | null) => set({ name }),
      setProfileImageUrl: (profileImageUrl: string | null) =>
        set({ profileImageUrl }),
      logout: () => set(initialState),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
