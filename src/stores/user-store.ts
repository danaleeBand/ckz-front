import { create } from 'zustand';

export type userStore = {
  id: number | null;
  name: string | null;
  profileImageUrl: string | null;
  setUserId: (id: number | null) => void;
  setUserName: (name: string | null) => void;
  setProfileImageUrl: (profileImageUrl: string | null) => void;
};

export const useUserStore = create<userStore>(set => ({
  id: null,
  name: null,
  profileImageUrl: null,
  setUserId: (id: number | null) => set({ id }),
  setUserName: (name: string | null) => set({ name }),
  setProfileImageUrl: (profileImageUrl: string | null) =>
    set({ profileImageUrl }),
}));
