import { create } from 'zustand';

export type ModalStore = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ModalStore>()(set => ({
  isModalOpen: false,
  toggleModal: () => set(state => ({ isModalOpen: !state.isModalOpen })),
}));
