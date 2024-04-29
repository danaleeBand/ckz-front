import { create } from 'zustand';

export type userStore = {
  name: string | null;
  profileImageUrl: string | null;
  setUserName: (name: string | null) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
};

export const useUserStore = create<userStore>(set => ({
  name: null,
  profileImageUrl: null,
  setUserName: (name: string | null) => set({ name }),
  setProfileImageUrl: (profileImageUrl: string | null) =>
    set({ profileImageUrl }),
}));
